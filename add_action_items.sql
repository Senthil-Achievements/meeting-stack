-- Migration: Create Action Items Table
-- Run this to enable the "To-Do List" feature

create table public.action_items (
  id uuid default uuid_generate_v4() primary key,
  meeting_id uuid references public.meetings(id) on delete cascade not null,
  text text not null,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.action_items enable row level security;

-- Policies (Checking meeting ownership would be ideal, but for MVP we can check user via join or just rely on meeting_id being hard to guess.
-- For strict security, we should ensure the user owns the meeting the action item belongs to.)

-- Helper policy to ensure user owns the meeting
create policy "Users can view action items for their meetings" on public.action_items for
select using (
        exists (
            select 1
            from public.meetings
            where
                meetings.id = action_items.meeting_id
                and meetings.user_id = auth.uid ()
        )
    );

create policy "Users can insert action items for their meetings" on public.action_items for
insert
with
    check (
        exists (
            select 1
            from public.meetings
            where
                meetings.id = action_items.meeting_id
                and meetings.user_id = auth.uid ()
        )
    );

create policy "Users can update action items for their meetings" on public.action_items for
update using (
    exists (
        select 1
        from public.meetings
        where
            meetings.id = action_items.meeting_id
            and meetings.user_id = auth.uid ()
    )
);

create policy "Users can delete action items for their meetings" on public.action_items for delete using (
    exists (
        select 1
        from public.meetings
        where
            meetings.id = action_items.meeting_id
            and meetings.user_id = auth.uid ()
    )
);