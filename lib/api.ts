import { DashboardData, Fight, EventItem, Fighter, NewsItem } from './types';
import { FIGHTERS, EVENTS, FIGHTS, NEWS, PROMOS } from './sample-data';

export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Try to fetch live news from RSS feeds
    const newsData = await fetchNews();
    
    const fighters = FIGHTERS;
    const events = EVENTS;
    const fights = FIGHTS;
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
    console.warn('Error in getDashboardData:', error);
    return getFallbackData();
  }
}

async function fetchNews(): Promise<NewsItem[]> {
  const rssFeeds = [
    { url: 'https://www.espn.com/espn/rss/mma/news', sport: 'MMA' as const },
    { url: 'https://www.bbc.co.uk/sport/boxing/rss.xml', sport: 'Boxing' as const },
    { url: 'https://www.bbc.co.uk/sport/mixed-martial-arts/rss.xml', sport: 'MMA' as const },
    { url: 'https://www.wwe.com/rss/news', sport: 'Wrestling' as const },
    { url: 'https://olympics.com/en/news/rss', sport: 'Olympic' as const }
  ];

  const allNews: NewsItem[] = [];

  for (const feed of rssFeeds) {
    try {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
        { 
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }
      );
      
      if (!res.ok) {
        console.warn(`RSS fetch failed for ${feed.url}: ${res.status}`);
        continue;
      }

      const data = await res.json();
      if (!data.items || !Array.isArray(data.items)) {
        console.warn(`No items in RSS feed: ${feed.url}`);
        continue;
      }

      for (const item of data.items.slice(0, 2)) {
        const title = item.title || 'Latest story';
        const sport = detectSport(title, item.link || '', feed.sport);
        
        allNews.push({
          source: data.feed?.title || item.author || 'News',
          category: detectCategory(title),
          title,
          time: formatRelativeTime(item.pubDate),
          sport: sport as any,
          emoji: emojiForSport(sport),
          url: item.link
        });
      }
    } catch (error) {
      console.warn(`Error fetching RSS feed ${feed.url}:`, error);
    }
  }

  return allNews;
}

function detectSport(title: string, link: string, defaultSport: string) {
  const text = `${title} ${link}`.toLowerCase();
  if (/(ufc|mma|mixed martial|bellator|pfl|rizin)/.test(text)) return 'MMA';
  if (/(boxing|heavyweight|middleweight|champion|title|matchroom|top rank|boxrec)/.test(text)) return 'Boxing';
  if (/(muay|kickboxing|thai|k1|glory|elbow)/.test(text)) return 'Muay Thai';
  if (/(wwe|wrestling|raw|smackdown|rumble|wrestlemania|aew|ladder match)/.test(text)) return 'Wrestling';
  if (/(olympic|tokyo|paris|judo|taekwondo|boxing|wrestling|combat)/.test(text)) return 'Olympic';
  return defaultSport;
}

function detectCategory(title: string) {
  if (/title|championship|match|fight|bout|event/.test(title.toLowerCase())) return 'Event';
  if (/injury|withdraw|cancel|pullout/.test(title.toLowerCase())) return 'Injury';
  if (/rank|ranking|top|best|contender/.test(title.toLowerCase())) return 'Rankings';
  if (/record|victory|defeat|win|lose/.test(title.toLowerCase())) return 'Result';
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
  try {
    const diff = Math.max(1, Math.round((Date.now() - new Date(dateString).getTime()) / 60000));
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.round(diff / 60)}h ago`;
    return `${Math.round(diff / 1440)}d ago`;
  } catch (error) {
    return 'recently';
  }
}

function generateRankings(fighters: Fighter[]) {
  const rankings = fighters.map((fighter, i) => ({
    fighterId: fighter.id,
    name: fighter.name,
    sport: fighter.sport,
    division: fighter.division,
    rank: fighter.rank || i + 1,
    record: `${fighter.wins}-${fighter.losses}-${fighter.draws}`
  }));

  return rankings.sort((a, b) => a.rank - b.rank);
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
