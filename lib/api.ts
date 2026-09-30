import { DashboardData, Fight, EventItem, Fighter, NewsItem } from './types';
import { FIGHTERS, EVENTS, FIGHTS, NEWS, PROMOS } from './sample-data';
import {
  fetchMMAEvents,
  fetchBoxingEvents,
  fetchMuayThaiEvents,
  fetchKickboxingEvents,
  fetchWrestlingEvents,
  fetchOlympicEvents,
  fetchAllNews
} from './data-sources';

export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Fetch all sport-specific data in parallel
    const [mmaNews, boxingNews, muayThaiNews, kickboxingNews, wrestlingNews, olympicNews, allNews] = 
      await Promise.all([
        fetchMMAEvents(),
        fetchBoxingEvents(),
        fetchMuayThaiEvents(),
        fetchKickboxingEvents(),
        fetchWrestlingEvents(),
        fetchOlympicEvents(),
        fetchAllNews()
      ]);

    // Use live news data if available, otherwise fallback
    const news = allNews && allNews.length > 0 ? allNews : NEWS;

    // Use seeded data as base (includes fighters and fights)
    const fighters = FIGHTERS;
    const events = EVENTS;
    const fights = FIGHTS;
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
    console.error('Error in getDashboardData:', error);
    return getFallbackData();
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
