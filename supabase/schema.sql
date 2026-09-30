CREATE TABLE IF NOT EXISTS fighters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  division TEXT NOT NULL,
  nationality TEXT,
  promo_id INTEGER,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  ko INTEGER DEFAULT 0,
  sub INTEGER DEFAULT 0,
  dec INTEGER DEFAULT 0,
  age INTEGER,
  height INTEGER,
  reach INTEGER,
  stance TEXT,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  promo_id INTEGER,
  date TIMESTAMPTZ,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'UPCOMING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fights (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  fighter_a_id INTEGER REFERENCES fighters(id),
  fighter_b_id INTEGER REFERENCES fighters(id),
  status TEXT NOT NULL DEFAULT 'UPCOMING',
  winner_id INTEGER REFERENCES fighters(id),
  method TEXT,
  round_label TEXT,
  sport TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rankings (
  id SERIAL PRIMARY KEY,
  sport TEXT NOT NULL,
  division TEXT NOT NULL,
  fighter_id INTEGER REFERENCES fighters(id),
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promotions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT,
  category TEXT,
  sport TEXT,
  url TEXT,
  published_at TIMESTAMPTZ,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  favorite_type TEXT NOT NULL,
  favorite_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fighters ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE fights ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON fighters FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON fights FOR SELECT USING (true);
CREATE POLICY "Public read access" ON rankings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON promotions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);
CREATE POLICY "Public read access" ON favorites FOR SELECT USING (true);
