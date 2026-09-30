# CLINCH Pro

A modern, minimal combat sports portal inspired by FotMob, built with Next.js and designed for real-time coverage of MMA, boxing, kickboxing, Muay Thai, wrestling, and Olympic combat sports.

## Stack
- Next.js 14
- TypeScript
- Supabase
- Realtime updates
- RSS/news ingestion

## Features
- Fighter pages
- Event pages
- Live and upcoming fight cards
- Rankings by sport and division
- News feed from major combat-sport channels
- Favorites tracking
- Clean minimal UI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your Supabase values.
4. Run the app:
   ```bash
   npm run dev
   ```

## Supabase
Use the SQL in `supabase/schema.sql` to create your database tables and enable RLS.

## Real data
The backend layer supports Supabase when configured and falls back to a sample dataset so the app can render immediately.

## Production notes
- Replace the fallback data with your own source API feeds.
- Add scheduled jobs to import fight/event/ranking/news data.
- Use Supabase Realtime subscriptions for live updates.
