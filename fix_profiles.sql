-- Backfill Profiles for existing users
-- Run this to fix the "foreign key constraint" error if you created an account before the schema was applied.

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