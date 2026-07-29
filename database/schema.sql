-- QG4 custom authentication database
-- This is separate from Supabase Auth.
-- Run in Supabase SQL Editor.

create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    username text unique not null,
    password_hash text not null,
    rubika_id text unique not null,
    avatar_url text,
    bio text default '',
    created_at timestamptz default now()
);

alter table public.users enable row level security;

-- The backend uses the Supabase service role key.
-- Do not expose that key to the browser.
-- No public client policies are created here intentionally.
