-- COMPLETE RESET & SETUP SCRIPT
-- WARNING: This will delete existing meetings and profiles to ensure a clean state.
-- Your actual User Accounts (email/password) will NOT be deleted.

-- 1. Clean up existing tables safely to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user ();

DROP TABLE IF EXISTS public.meetings;

DROP TABLE IF EXISTS public.profiles;

-- 2. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 3. Create Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles for
select using (auth.uid () = id);

create policy "Users can update own profile" on public.profiles for
update using (auth.uid () = id);

-- 5. Create Meetings Table
create table public.meetings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  date date not null,
  time time,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Enable RLS for Meetings
alter table public.meetings enable row level security;

create policy "Users can view own meetings" on public.meetings for
select using (auth.uid () = user_id);

create policy "Users can insert own meetings" on public.meetings for
insert
with
    check (auth.uid () = user_id);

create policy "Users can update own meetings" on public.meetings for
update using (auth.uid () = user_id);

create policy "Users can delete own meetings" on public.meetings for delete using (auth.uid () = user_id);

-- 7. Create Trigger for FUTURE users
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Backfill Profiles for EXISTING users
INSERT INTO
    public.profiles (
        id,
        email,
        full_name,
        avatar_url
    )
SELECT
    id,
    email,
    raw_user_meta_data ->> 'full_name',
    raw_user_meta_data ->> 'avatar_url'
FROM auth.users ON CONFLICT (id) DO NOTHING;