-- Migration: Add updated_at column to meetings table
-- Run this to fix the "Failed to save notes" error

ALTER TABLE public.meetings
ADD COLUMN IF NOT EXISTS updated_at timestamp
with
    time zone;