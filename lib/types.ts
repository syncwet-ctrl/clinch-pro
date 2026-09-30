export type Sport = 'MMA' | 'Boxing' | 'Kickboxing' | 'Muay Thai' | 'Wrestling' | 'Olympic';

export type Fighter = {
  id: number;
  name: string;
  sport: Sport;
  division: string;
  nationality: string;
  promoId: number;
  wins: number;
  losses: number;
  draws: number;
  ko: number;
  sub: number;
  dec: number;
  age: number;
  height: number;
  reach: number;
  stance: string;
  rank: number;
};

export type EventItem = {
  id: number;
  name: string;
  sport: Sport;
  promoId: number;
  date: string;
  city: string;
  status: 'LIVE' | 'UPCOMING' | 'FINAL';
};

export type Fight = {
  id: number;
  eventId: number;
  a: number;
  b: number;
  st: 'LIVE' | 'UPCOMING' | 'FINAL';
  winner: number | null;
  method: string | null;
  round: string | null;
  sport: Sport;
};

export type NewsItem = {
  source: string;
  category: string;
  title: string;
  time: string;
  sport: Sport;
  emoji: string;
  url?: string;
};

export type RankingRow = {
  fighterId: number;
  name: string;
  sport: Sport;
  division: string;
  rank: number;
  record: string;
};

export type DashboardData = {
  fighters: Fighter[];
  events: EventItem[];
  fights: Fight[];
  rankings: RankingRow[];
  news: NewsItem[];
  promos: Array<{ id: number; name: string; sport: Sport; country: string }>
};
