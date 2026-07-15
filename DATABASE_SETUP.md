# Database & Login setup (CIVICAVITA AB)

The site works out of the box in **local demo mode** (accounts and posts are
stored in the visitor's browser). To use a **real shared database** with login
and registration across all devices, connect a free Supabase project.

## 1. Create a Supabase project
1. Go to https://supabase.com and create a free project.
2. Open **Project Settings → API** and copy:
   - Project URL
   - `anon` public key

## 2. Configure the app
Create a `.env` file in the project root (see `.env.example`):

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

Then rebuild the site. The admin login screen will show a green
"Database connected" indicator when it is wired up correctly.

## 3. Create the tables
In the Supabase **SQL editor**, run:

```sql
-- Posts table
create table if not exists posts (
  id text primary key,
  title text not null,
  excerpt text,
  body text not null,
  category text,
  author text,
  date date not null default now(),
  language text not null default 'en'
);

-- Users table (demo-grade; passwords stored as plain text for the demo)
create table if not exists users (
  username text primary key,
  password text not null
);

-- Seed the demo admin account
insert into users (username, password)
values ('admin', 'civicavita')
on conflict (username) do nothing;

-- Allow the public anon key to read/write for this demo.
-- (For production, replace with proper Row Level Security + hashed passwords.)
alter table posts enable row level security;
alter table users enable row level security;

create policy "public posts read"  on posts for select using (true);
create policy "public posts write" on posts for insert with check (true);
create policy "public posts delete" on posts for delete using (true);

create policy "public users read"  on users for select using (true);
create policy "public users write" on users for insert with check (true);
```

## Demo admin account
- **Username:** `admin`
- **Password:** `civicavita`

These credentials are also shown on the admin login screen.

## Security note
This is a **demo-grade** auth setup (plain-text passwords, open policies) so it
can run without a dedicated backend. For real production use, switch to Supabase
Auth (hashed passwords, sessions) and lock down the Row Level Security policies.
