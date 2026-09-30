import type { DashboardData, EventItem, Fight, Fighter, NewsItem, RankingRow, Sport } from './types';

const TIMEOUT_MS = 8000;
const RSS_BRIDGE = 'https://api.rss2json.com/v1/api.json?rss_url=';
const SPORTS_DB_KEY = process.env.SPORTSDB_API_KEY || '3';
const SPORTS_DB_BASE = `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_KEY}`;

const PROMOS = [
  { id: 1, name: 'UFC', sport: 'MMA' as Sport, country: 'USA' },
  { id: 2, name: 'Boxing', sport: 'Boxing' as Sport, country: 'International' },
  { id: 3, name: 'GLORY', sport: 'Kickboxing' as Sport, country: 'International' },
  { id: 4, name: 'ONE Championship', sport: 'Muay Thai' as Sport, country: 'Singapore' },
  { id: 5, name: 'WWE', sport: 'Wrestling' as Sport, country: 'USA' },
  { id: 6, name: 'Olympics', sport: 'Olympic' as Sport, country: 'International' }
];

const SOURCES = {
  ufcStats: 'http://ufcstats.com/statistics/events/completed?page=all',
  sportsDbBoxing: `${SPORTS_DB_BASE}/searchevents.php?e=boxing`,
  sportsDbKickboxing: `${SPORTS_DB_BASE}/searchevents.php?e=kickboxing`,
  espnMma: 'https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard',
  espnBoxing: 'https://site.api.espn.com/apis/site/v2/sports/boxing/boxing/scoreboard'
};

type ProviderResult<T> = { value: T; error?: string };

async function request<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json() as T;
  } finally {
    clearTimeout(timer);
  }
}

async function textRequest(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function stableId(value: string) {
  let hash = 0;
  for (const char of value) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  return Math.abs(hash) || 1;
}

function sportFromText(text: string, fallback: Sport): Sport {
  const value = text.toLowerCase();
  if (/kickbox|glory|k-1/.test(value)) return 'Kickboxing';
  if (/boxing|boxrec|top rank|matchroom/.test(value)) return 'Boxing';
  if (/muay|thai|one championship/.test(value)) return 'Muay Thai';
  if (/wwe|aew|wrestling/.test(value)) return 'Wrestling';
  if (/olympic|judo|taekwondo/.test(value)) return 'Olympic';
  return fallback;
}

function eventStatus(date: string, providerStatus?: string): EventItem['status'] {
  const status = (providerStatus || '').toLowerCase();
  if (/live|progress|in progress/.test(status)) return 'LIVE';
  if (/final|complete|ended/.test(status)) return 'FINAL';
  return new Date(date).getTime() < Date.now() ? 'FINAL' : 'UPCOMING';
}

function makeFighter(name: string, sport: Sport, source: string): Fighter {
  return { id: stableId(`${source}:${sport}:${name}`), name, sport, division: 'Division unavailable', nationality: '—', promoId: sport === 'MMA' ? 1 : 2, wins: 0, losses: 0, draws: 0, ko: 0, sub: 0, dec: 0, age: 0, height: 0, reach: 0, stance: '—', rank: 0, source };
}

function mapEspnEvent(raw: any, sport: Sport): { event?: EventItem; fight?: Fight; fighters: Fighter[] } {
  const competition = raw.competitions?.[0];
  const date = raw.date || competition?.date;
  if (!date) return { fighters: [] };
  const eventId = stableId(`espn-event:${raw.id || raw.name}:${date}`);
  const event: EventItem = { id: eventId, name: raw.name || raw.shortName || 'Combat event', sport, promoId: sport === 'MMA' ? 1 : 2, date: new Date(date).toISOString(), city: competition?.venue?.fullName || raw.venue?.fullName || 'Venue unavailable', status: eventStatus(date, raw.status?.type?.name || raw.status?.type?.description), source: 'ESPN Scoreboard', sourceUrl: raw.links?.[0]?.href };
  const competitors = competition?.competitors || [];
  if (competitors.length < 2) return { event, fighters: [] };
  const names = competitors.slice(0, 2).map((item: any) => item.athlete?.displayName || item.team?.displayName).filter(Boolean);
  if (names.length < 2) return { event, fighters: [] };
  const fighters = names.map((name: string) => makeFighter(name, sport, 'ESPN Scoreboard'));
  const fight: Fight = { id: stableId(`espn-fight:${raw.id}`), eventId, a: fighters[0].id, b: fighters[1].id, st: event.status, winner: null, method: null, round: null, sport, source: 'ESPN Scoreboard' };
  return { event, fight, fighters };
}

async function fetchEspn(url: string, sport: Sport): Promise<ProviderResult<{ events: EventItem[]; fights: Fight[]; fighters: Fighter[] }>> {
  try {
    const data = await request<any>(url);
    const mapped = (data.events || []).map((item: any) => mapEspnEvent(item, sport));
    return { value: { events: mapped.flatMap(item => item.event ? [item.event] : []), fights: mapped.flatMap(item => item.fight ? [item.fight] : []), fighters: mapped.flatMap(item => item.fighters) } };
  } catch (error) {
    return { value: { events: [], fights: [], fighters: [] }, error: `${sport} scoreboard unavailable` };
  }
}

async function fetchSportsDbEvents(searchTerm: string, sport: Sport): Promise<ProviderResult<EventItem[]>> {
  try {
    const data = await request<any>(`${SPORTS_DB_BASE}/searchevents.php?e=${encodeURIComponent(searchTerm)}`);
    const rows = Array.isArray(data.event) ? data.event : [];
    return { value: rows.filter((row: any) => row.dateEvent).map((row: any) => {
      const date = new Date(`${row.dateEvent}T${row.strTime || '00:00:00'}Z`).toISOString();
      return { id: stableId(`sportsdb:${row.idEvent}`), name: row.strEvent || `${sport} event`, sport, promoId: sport === 'Boxing' ? 2 : 3, date, city: row.strVenue || row.strCountry || 'Venue unavailable', status: eventStatus(date, row.strStatus), source: 'TheSportsDB', sourceUrl: row.strVideo || undefined };
    }) };
  } catch (error) {
    return { value: [], error: `${sport} TheSportsDB events unavailable` };
  }
}

async function fetchUfcStats(): Promise<ProviderResult<EventItem[]>> {
  try {
    const html = await textRequest(SOURCES.ufcStats);
    const events: EventItem[] = [];
    const pattern = /<a[^>]+href="([^"]*event-details[^"]*)"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?<span[^>]*>([^<]+)<\/span>/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) && events.length < 100) {
      const parsed = new Date(match[3].trim());
      if (Number.isNaN(parsed.getTime())) continue;
      events.push({ id: stableId(`ufcstats:${match[1]}`), name: match[2].trim(), sport: 'MMA', promoId: 1, date: parsed.toISOString(), city: 'Venue unavailable', status: 'FINAL', source: 'UFCStats', sourceUrl: `http://ufcstats.com${match[1]}` });
    }
    return { value: events };
  } catch (error) {
    return { value: [], error: 'UFCStats unavailable' };
  }
}

async function fetchNews(): Promise<ProviderResult<NewsItem[]>> {
  const feeds: Array<{ url: string; sport: Sport }> = [
    { url: 'https://www.espn.com/espn/rss/mma/news', sport: 'MMA' },
    { url: 'https://www.bbc.co.uk/sport/boxing/rss.xml', sport: 'Boxing' },
    { url: 'https://www.wwe.com/rss/news', sport: 'Wrestling' },
    { url: 'https://olympics.com/en/news/rss', sport: 'Olympic' }
  ];
  const errors: string[] = [];
  const all = (await Promise.all(feeds.map(async feed => {
    try {
      const data = await request<any>(`${RSS_BRIDGE}${encodeURIComponent(feed.url)}`);
      return (data.items || []).slice(0, 8).filter((item: any) => item.title).map((item: any) => ({ source: data.feed?.title || feed.sport, category: /injur|withdraw|cancel/i.test(item.title) ? 'Injury' : 'News', title: item.title, time: relativeTime(item.pubDate), sport: sportFromText(`${item.title} ${item.link || ''}`, feed.sport), emoji: emojiFor(feed.sport), url: item.link } as NewsItem));
    } catch (error) {
      errors.push(`${feed.sport} news unavailable`);
      return [];
    }
  }))).flat();
  return { value: all, error: errors.join('; ') || undefined };
}

function relativeTime(value?: string) {
  if (!value) return 'recently';
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  return minutes < 60 ? `${minutes}m ago` : minutes < 1440 ? `${Math.round(minutes / 60)}h ago` : `${Math.round(minutes / 1440)}d ago`;
}

function emojiFor(sport: Sport) {
  return { MMA: '🥊', Boxing: '🥊', Kickboxing: '🥋', 'Muay Thai': '🦵', Wrestling: '🏆', Olympic: '🏅' }[sport];
}

export async function getDashboardData(): Promise<DashboardData> {
  const errors: string[] = [];
  const [ufc, mma, boxing, sportsBoxing, kickboxing, news] = await Promise.all([
    fetchUfcStats(),
    fetchEspn(SOURCES.espnMma, 'MMA'),
    fetchEspn(SOURCES.espnBoxing, 'Boxing'),
    fetchSportsDbEvents('boxing', 'Boxing'),
    fetchSportsDbEvents('kickboxing', 'Kickboxing'),
    fetchNews()
  ]);
  [ufc, mma, boxing, sportsBoxing, kickboxing, news].forEach(result => { if (result.error) errors.push(result.error); });
  const events = [...ufc.value, ...mma.value.events, ...boxing.value.events, ...sportsBoxing.value, ...kickboxing.value];
  const fights = [...mma.value.fights, ...boxing.value.fights];
  const fighters = [...mma.value.fighters, ...boxing.value.fighters];
  const uniqueFighters = Array.from(new Map(fighters.map(fighter => [fighter.id, fighter])).values());
  const rankings: RankingRow[] = uniqueFighters.map((fighter, index) => ({ fighterId: fighter.id, name: fighter.name, sport: fighter.sport, division: fighter.division, rank: index + 1, record: 'Unavailable from free source' }));
  return { fighters: uniqueFighters, events, fights, rankings, news: news.value, promos: PROMOS, updatedAt: new Date().toISOString(), sources: Object.values(SOURCES), errors };
}

export async function fetchRealTimeNews() {
  return (await fetchNews()).value;
}
