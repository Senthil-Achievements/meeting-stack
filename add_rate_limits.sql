-- Migration: Add rate limit columns
-- Run this to enable the "One change per month" restriction

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_name_change_at timestamp
with
    time zone,
ADD COLUMN IF NOT EXISTS last_password_change_at timestamp
with
    time zone;