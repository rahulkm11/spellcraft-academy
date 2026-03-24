

## Admin Analytics Dashboard — Implementation Plan

### Overview
Build a real backend with Supabase to collect analytics events from all players, and an admin dashboard at `/admin` with date-range filtering, aggregate metrics, and charts. Admin login uses hardcoded credentials (prototype only).

**Note on security**: Hardcoded admin credentials are fine for a prototype demo. For production, this should be replaced with proper Supabase Auth.

---

### Step 1: Enable Supabase (Lovable Cloud)
Connect the project to Supabase so we have a database and edge functions.

### Step 2: Create `analytics_events` table (migration)
```sql
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,  -- 'spell_completed', 'spell_rated', 'session_start'
  player_name text not null,
  spell_id text,
  book_index int,
  rating int,
  scenarios_completed int,
  session_duration_seconds int,
  created_at timestamptz default now()
);

create index idx_analytics_created on public.analytics_events(created_at);
alter table public.analytics_events enable row level security;

-- Anyone can insert (kids don't log in)
create policy "anon_insert" on public.analytics_events
  for insert to anon with check (true);

-- No public reads
create policy "no_public_read" on public.analytics_events
  for select to anon using (false);
```

### Step 3: Create edge function `track-event`
- POST endpoint that validates and inserts an event into `analytics_events`
- No auth required (anonymous inserts)
- CORS headers included

### Step 4: Create edge function `get-analytics`
- GET endpoint with `startDate` and `endDate` query params
- Protected by a simple admin token check (query param `token=spellpassword123`)
- Returns aggregated JSON: unique players, total spells played, avg rating, total time, per-book breakdown, rating distribution, top players, top spells, recent activity

### Step 5: Update `GameContext.tsx`
- Import Supabase client
- On `setPlayerName`: fire `session_start` event
- On `rateSpell`: fire `spell_completed` + `spell_rated` events with spell_id, book_index, rating, duration

### Step 6: Create `src/screens/AdminLoginScreen.tsx`
- Simple login form: username + password
- Validates against hardcoded `spelladmin123` / `spellpassword123`
- On success, stores token in state and shows dashboard

### Step 7: Create `src/screens/AdminDashboardScreen.tsx`
- **Date range picker** (start date, end date inputs)
- **Metric cards**: Total players, Total spells played, Average rating, Total play time
- **Charts** (using existing recharts/chart components):
  - Bar chart: spells played per book
  - Bar chart: rating distribution (1-5 stars)
- **Tables**:
  - Top players (name, spells count, avg rating)
  - Top spells (name, times played, avg rating)
  - Recent activity log (last 20 events)
- **Logout button**

### Step 8: Add `/admin` route in `App.tsx`
- Route renders `AdminLoginScreen` which gates access to `AdminDashboardScreen`
- Completely separate from the kid-facing app

---

### Files summary

| File | Action |
|------|--------|
| `supabase/migrations/001_analytics.sql` | Create |
| `supabase/functions/track-event/index.ts` | Create |
| `supabase/functions/get-analytics/index.ts` | Create |
| `src/integrations/supabase/client.ts` | Auto-generated on connect |
| `src/lib/analytics.ts` | Create — helper to call track-event |
| `src/context/GameContext.tsx` | Modify — fire tracking calls |
| `src/screens/AdminLoginScreen.tsx` | Create |
| `src/screens/AdminDashboardScreen.tsx` | Create |
| `src/App.tsx` | Modify — add `/admin` route |

