import { DashboardData, Fight, EventItem, Fighter, NewsItem } from './types';
import { FIGHTERS, EVENTS, FIGHTS, NEWS, PROMOS } from './sample-data';

export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Fetch from free APIs
    const [fightersData, eventsData, fightsData, newsData] = await Promise.all([
      fetchFighters(),
      fetchEvents(),
      fetchFights(),
      fetchNews()
    ]);

    const fighters = fightersData.length > 0 ? fightersData : FIGHTERS;
    const events = eventsData.length > 0 ? eventsData : EVENTS;
    const fights = fightsData.length > 0 ? fightsData : FIGHTS;
    const news = newsData.length > 0 ? newsData : NEWS;

    const rankings = generateRankings(fighters);

    return {
      fighters,
      events,
      fights,
      rankings,
      news,
      promos: PROMOS
    };
  } catch (error) {
    console.warn('Error fetching from APIs, using fallback data:', error);
    return getFallbackData();
  }
}

async function fetchFighters(): Promise<Fighter[]> {
  try {
    // Using fallback data since free MMA APIs are limited
    // Alternatives: UFC API (requires key), MMA Junkie RSS, BoxRec
    return [];
  } catch (error) {
    console.warn('Failed to fetch fighters:', error);
    return [];
  }
}

async function fetchEvents(): Promise<EventItem[]> {
  try {
    // Fetch upcoming events from multiple sources
    const ufc = await fetchUFCEvents();
    const boxing = await fetchBoxingEvents();
    const wrestling = await fetchWrestlingEvents();
    const olympic = await fetchOlympicEvents();

    return [...ufc, ...boxing, ...wrestling, ...olympic];
  } catch (error) {
    console.warn('Failed to fetch events:', error);
    return [];
  }
}

async function fetchUFCEvents(): Promise<EventItem[]> {
  try {
    // UFC official site RSS or scrap
    const res = await fetch('https://www.ufc.com/', { cache: 'no-store' });
    // Parse and extract events (simplified - use RSS feed instead)
    return [];
  } catch (error) {
    console.warn('UFC events fetch failed:', error);
    return [];
  }
}

async function fetchBoxingEvents(): Promise<EventItem[]> {
  try {
    // Top Rank / Matchroom events
    const res = await fetch('https://www.toprank.com/', { cache: 'no-store' });
    return [];
  } catch (error) {
    console.warn('Boxing events fetch failed:', error);
    return [];
  }
}

async function fetchWrestlingEvents(): Promise<EventItem[]> {
  try {
    // WWE events
    const res = await fetch('https://www.wwe.com/', { cache: 'no-store' });
    return [];
  } catch (error) {
    console.warn('Wrestling events fetch failed:', error);
    return [];
  }
}

async function fetchOlympicEvents(): Promise<EventItem[]> {
  try {
    // Olympics.com
    const res = await fetch('https://olympics.com/en/news', { cache: 'no-store' });
    return [];
  } catch (error) {
    console.warn('Olympic events fetch failed:', error);
    return [];
  }
}

async function fetchFights(): Promise<Fight[]> {
  return [];
}

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const rssFeeds = [
      'https://www.espn.com/espn/rss/mma/news',
      'https://www.bbc.co.uk/sport/boxing/rss.xml',
      'https://www.bbc.co.uk/sport/mixed-martial-arts/rss.xml',
      'https://www.wwe.com/rss/news',
      'https://olympics.com/en/news/rss'
    ];

    const allNews: NewsItem[] = [];

    for (const feed of rssFeeds) {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`,
          { cache: 'no-store' }
        );
        if (!res.ok) continue;

        const data = await res.json();
        if (!data.items) continue;

        for (const item of data.items.slice(0, 3)) {
          const title = item.title || 'Latest story';
          const sport = detectSport(title, item.link || '');
          allNews.push({
            source: item.source?.title || 'News',
            category: detectCategory(title),
            title,
            time: formatRelativeTime(item.pubDate),
            sport: sport as any,
            emoji: emojiForSport(sport),
            url: item.link
          });
        }
      } catch (error) {
        console.warn('RSS feed fetch failed:', feed, error);
      }
    }

    return allNews;
  } catch (error) {
    console.warn('Failed to fetch news:', error);
    return [];
  }
}

function detectSport(title: string, link: string) {
  const text = `${title} ${link}`.toLowerCase();
  if (/(ufc|mma|mixed martial|bellator|pfl)/.test(text)) return 'MMA';
  if (/(boxing|heavyweight|middleweight|champion|title|matchroom|top rank)/.test(text)) return 'Boxing';
  if (/(muay|kickboxing|thai|k1|glory|elbow)/.test(text)) return 'Muay Thai';
  if (/(wwe|wrestling|raw|smackdown|rumble|wrestlemania|aew)/.test(text)) return 'Wrestling';
  if (/(olympic|tokyo|paris|judo|taekwondo|boxing|wrestling)/.test(text)) return 'Olympic';
  return 'MMA';
}

function detectCategory(title: string) {
  if (/title|championship|match|fight/.test(title.toLowerCase())) return 'Event';
  if (/injury|withdraw|cancel/.test(title.toLowerCase())) return 'News';
  if (/rank|top|best/.test(title.toLowerCase())) return 'Rankings';
  return 'General';
}

function emojiForSport(sport: string) {
  const map: Record<string, string> = {
    MMA: '🥊',
    Boxing: '🥊',
    'Muay Thai': '🦵',
    Kickboxing: '🥋',
    Wrestling: '🏆',
    Olympic: '🏅'
  };
  return map[sport] || '📰';
}

function formatRelativeTime(dateString?: string) {
  if (!dateString) return 'recently';
  const diff = Math.max(1, Math.round((Date.now() - new Date(dateString).getTime()) / 60000));
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.round(diff / 60)}h ago`;
  return `${Math.round(diff / 1440)}d ago`;
}

function generateRankings(fighters: Fighter[]) {
  const byDivision: Record<string, Fighter[]> = {};
  fighters.forEach((f) => {
    if (!byDivision[f.division]) byDivision[f.division] = [];
    byDivision[f.division].push(f);
  });

  const rankings = [];
  for (const division in byDivision) {
    const ranked = byDivision[division]
      .sort((a, b) => b.wins / (b.wins + b.losses + 1) - a.wins / (a.wins + a.losses + 1))
      .slice(0, 10);

    ranked.forEach((fighter, i) => {
      rankings.push({
        fighterId: fighter.id,
        name: fighter.name,
        sport: fighter.sport,
        division: fighter.division,
        rank: i + 1,
        record: `${fighter.wins}-${fighter.losses}-${fighter.draws}`
      });
    });
  }

  return rankings;
}

function getFallbackData(): DashboardData {
  return {
    fighters: FIGHTERS,
    events: EVENTS,
    fights: FIGHTS,
    rankings: generateRankings(FIGHTERS),
    news: NEWS,
    promos: PROMOS
  };
}
