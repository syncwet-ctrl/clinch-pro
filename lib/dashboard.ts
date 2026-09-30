import { DashboardData, FIGHTERS, EVENTS, FIGHTS, NEWS, PROMOS } from './sample-data';

export const rankingRows = FIGHTERS.slice(0, 10).map((fighter, index) => ({
  fighterId: fighter.id,
  name: fighter.name,
  sport: fighter.sport,
  division: fighter.division,
  rank: index + 1,
  record: `${fighter.wins}-${fighter.losses}-${fighter.draws}`
}));

export async function getDashboardData(): Promise<DashboardData> {
  return {
    fighters: FIGHTERS,
    events: EVENTS,
    fights: FIGHTS,
    rankings: rankingRows,
    news: NEWS,
    promos: PROMOS
  };
}

export async function getNewsFeed() {
  return NEWS;
}
