
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  player_name text not null,
  spell_id text,
  book_index int,
  rating int,
  scenarios_completed int,
  session_duration_seconds int,
  created_at timestamptz default now()
);

create index idx_analytics_created on public.analytics_events(created_at);
create index idx_analytics_event_type on public.analytics_events(event_type);

alter table public.analytics_events enable row level security;

create policy "anon_insert" on public.analytics_events
  for insert to anon with check (true);

create policy "no_public_read" on public.analytics_events
  for select to anon using (false);
