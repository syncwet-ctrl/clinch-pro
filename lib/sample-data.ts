export const SPORTS = ['MMA', 'Boxing', 'Kickboxing', 'Muay Thai', 'Wrestling', 'Olympic'] as const;

export const PROMOS = [
  { id: 1, name: 'UFC', sport: 'MMA' as const, country: 'USA' },
  { id: 2, name: 'PFL', sport: 'MMA' as const, country: 'USA' },
  { id: 3, name: 'Bellator', sport: 'MMA' as const, country: 'USA' },
  { id: 4, name: 'Top Rank', sport: 'Boxing' as const, country: 'USA' },
  { id: 5, name: 'Matchroom', sport: 'Boxing' as const, country: 'UK' },
  { id: 6, name: 'ONE Championship', sport: 'Muay Thai' as const, country: 'Singapore' },
  { id: 7, name: 'GLORY', sport: 'Kickboxing' as const, country: 'Netherlands' },
  { id: 8, name: 'WWE', sport: 'Wrestling' as const, country: 'USA' },
  { id: 9, name: 'Olympics', sport: 'Olympic' as const, country: 'International' },
  { id: 10, name: 'Rizin', sport: 'MMA' as const, country: 'Japan' },
  { id: 11, name: 'BKFC', sport: 'Boxing' as const, country: 'USA' },
  { id: 12, name: 'AEW', sport: 'Wrestling' as const, country: 'USA' }
];

export const FIGHTERS = [
  { id: 1, name: 'Marcus Vega', sport: 'MMA' as const, division: 'Welterweight', nationality: 'USA', promoId: 1, wins: 19, losses: 2, draws: 0, ko: 9, sub: 3, dec: 7, age: 30, height: 183, reach: 190, stance: 'Orthodox', rank: 1 },
  { id: 2, name: 'Diego Okafor', sport: 'MMA' as const, division: 'Welterweight', nationality: 'Brazil', promoId: 1, wins: 16, losses: 4, draws: 0, ko: 7, sub: 2, dec: 7, age: 29, height: 181, reach: 188, stance: 'Orthodox', rank: 2 },
  { id: 3, name: 'Ivan Petrov', sport: 'MMA' as const, division: 'Middleweight', nationality: 'Russia', promoId: 10, wins: 18, losses: 3, draws: 0, ko: 7, sub: 4, dec: 7, age: 31, height: 185, reach: 196, stance: 'Southpaw', rank: 3 },
  { id: 4, name: 'Kenji Tanaka', sport: 'MMA' as const, division: 'Middleweight', nationality: 'Japan', promoId: 10, wins: 15, losses: 5, draws: 0, ko: 9, sub: 1, dec: 5, age: 32, height: 182, reach: 194, stance: 'Orthodox', rank: 4 },
  { id: 5, name: 'Liam Walsh', sport: 'Boxing' as const, division: 'Super Middleweight', nationality: 'UK', promoId: 5, wins: 23, losses: 1, draws: 0, ko: 13, sub: 0, dec: 10, age: 28, height: 182, reach: 188, stance: 'Orthodox', rank: 1 },
  { id: 6, name: 'Tariq Costa', sport: 'Boxing' as const, division: 'Super Middleweight', nationality: 'Brazil', promoId: 4, wins: 21, losses: 2, draws: 1, ko: 11, sub: 0, dec: 10, age: 30, height: 181, reach: 186, stance: 'Southpaw', rank: 2 },
  { id: 7, name: 'Noah Reyes', sport: 'Boxing' as const, division: 'Light Heavyweight', nationality: 'USA', promoId: 4, wins: 24, losses: 3, draws: 0, ko: 18, sub: 0, dec: 6, age: 31, height: 189, reach: 197, stance: 'Orthodox', rank: 3 },
  { id: 8, name: 'Rafael Sakda', sport: 'Muay Thai' as const, division: 'Lightweight', nationality: 'Thailand', promoId: 6, wins: 27, losses: 4, draws: 0, ko: 18, sub: 0, dec: 9, age: 29, height: 176, reach: 182, stance: 'Orthodox', rank: 1 },
  { id: 9, name: 'Somchai Doyle', sport: 'Muay Thai' as const, division: 'Lightweight', nationality: 'Thailand', promoId: 6, wins: 24, losses: 6, draws: 0, ko: 16, sub: 0, dec: 8, age: 31, height: 178, reach: 184, stance: 'Orthodox', rank: 2 },
  { id: 10, name: 'Declan Lemaire', sport: 'Kickboxing' as const, division: 'Lightweight', nationality: 'France', promoId: 7, wins: 20, losses: 3, draws: 0, ko: 12, sub: 0, dec: 8, age: 29, height: 180, reach: 185, stance: 'Orthodox', rank: 1 },
  { id: 11, name: 'Andre Novak', sport: 'Kickboxing' as const, division: 'Lightweight', nationality: 'Croatia', promoId: 7, wins: 18, losses: 4, draws: 0, ko: 11, sub: 0, dec: 7, age: 27, height: 181, reach: 187, stance: 'Southpaw', rank: 2 },
  { id: 12, name: 'Yuto Silva', sport: 'Wrestling' as const, division: 'Heavyweight', nationality: 'Japan', promoId: 8, wins: 22, losses: 8, draws: 0, ko: 0, sub: 0, dec: 0, age: 35, height: 193, reach: 198, stance: 'Orthodox', rank: 1 },
  { id: 13, name: 'Mateo Hart', sport: 'Wrestling' as const, division: 'Heavyweight', nationality: 'USA', promoId: 8, wins: 24, losses: 6, draws: 0, ko: 0, sub: 0, dec: 0, age: 34, height: 196, reach: 201, stance: 'Orthodox', rank: 2 },
  { id: 14, name: 'Sean Moreau', sport: 'Olympic' as const, division: 'Featherweight', nationality: 'France', promoId: 9, wins: 13, losses: 2, draws: 0, ko: 4, sub: 2, dec: 7, age: 24, height: 176, reach: 178, stance: 'Orthodox', rank: 1 },
  { id: 15, name: 'Viktor Kade', sport: 'Olympic' as const, division: 'Welterweight', nationality: 'Germany', promoId: 9, wins: 12, losses: 3, draws: 0, ko: 3, sub: 3, dec: 6, age: 23, height: 181, reach: 185, stance: 'Orthodox', rank: 2 },
  { id: 16, name: 'Amir Khan', sport: 'Boxing' as const, division: 'Middleweight', nationality: 'UK', promoId: 5, wins: 28, losses: 5, draws: 0, ko: 16, sub: 0, dec: 12, age: 32, height: 184, reach: 192, stance: 'Orthodox', rank: 4 },
  { id: 17, name: 'Jermaine Green', sport: 'MMA' as const, division: 'Lightweight', nationality: 'USA', promoId: 2, wins: 14, losses: 3, draws: 0, ko: 6, sub: 5, dec: 3, age: 26, height: 177, reach: 180, stance: 'Orthodox', rank: 5 },
  { id: 18, name: 'Ngannou Strong', sport: 'MMA' as const, division: 'Heavyweight', nationality: 'Cameroon', promoId: 1, wins: 17, losses: 2, draws: 0, ko: 11, sub: 2, dec: 4, age: 33, height: 191, reach: 202, stance: 'Orthodox', rank: 3 },
  { id: 19, name: 'Khabib Legacy', sport: 'MMA' as const, division: 'Lightweight', nationality: 'Russia', promoId: 1, wins: 20, losses: 1, draws: 0, ko: 5, sub: 12, dec: 3, age: 29, height: 180, reach: 188, stance: 'Orthodox', rank: 1 },
  { id: 20, name: 'Conor McGregor Type', sport: 'MMA' as const, division: 'Featherweight', nationality: 'Ireland', promoId: 1, wins: 19, losses: 6, draws: 0, ko: 11, sub: 2, dec: 6, age: 31, height: 178, reach: 188, stance: 'Southpaw', rank: 4 }
];

export const EVENTS = [
  { id: 1, name: 'UFC 320: Championship Night', sport: 'MMA' as const, promoId: 1, date: '2026-09-30T20:00:00Z', city: 'Las Vegas', status: 'LIVE' as const },
  { id: 2, name: 'Top Rank Live Boxing', sport: 'Boxing' as const, promoId: 4, date: '2026-10-02T22:00:00Z', city: 'Las Vegas', status: 'UPCOMING' as const },
  { id: 3, name: 'ONE Championship 25', sport: 'Muay Thai' as const, promoId: 6, date: '2026-10-03T19:30:00Z', city: 'Bangkok', status: 'UPCOMING' as const },
  { id: 4, name: 'GLORY 31 Kickboxing', sport: 'Kickboxing' as const, promoId: 7, date: '2026-10-05T18:00:00Z', city: 'Rotterdam', status: 'UPCOMING' as const },
  { id: 5, name: 'WWE Clash at the Coast', sport: 'Wrestling' as const, promoId: 8, date: '2026-10-08T20:00:00Z', city: 'Miami', status: 'UPCOMING' as const },
  { id: 6, name: 'Olympic Combat Finals', sport: 'Olympic' as const, promoId: 9, date: '2026-10-15T17:00:00Z', city: 'Paris', status: 'UPCOMING' as const },
  { id: 7, name: 'PFL Season Finale', sport: 'MMA' as const, promoId: 2, date: '2026-10-18T20:00:00Z', city: 'Atlantic City', status: 'UPCOMING' as const },
  { id: 8, name: 'Matchroom Elite Boxing', sport: 'Boxing' as const, promoId: 5, date: '2026-10-20T21:00:00Z', city: 'London', status: 'UPCOMING' as const },
  { id: 11, name: 'UFC 319: Toronto Showdown', sport: 'MMA' as const, promoId: 1, date: '2026-09-22T20:00:00Z', city: 'Toronto', status: 'FINAL' as const },
  { id: 12, name: 'Top Rank Night Fight', sport: 'Boxing' as const, promoId: 4, date: '2026-09-15T22:00:00Z', city: 'New York', status: 'FINAL' as const },
  { id: 13, name: 'ONE Championship 24', sport: 'Muay Thai' as const, promoId: 6, date: '2026-09-18T19:30:00Z', city: 'Singapore', status: 'FINAL' as const },
  { id: 14, name: 'GLORY 30', sport: 'Kickboxing' as const, promoId: 7, date: '2026-09-10T18:00:00Z', city: 'Amsterdam', status: 'FINAL' as const },
  { id: 15, name: 'WWE Raw Showcase', sport: 'Wrestling' as const, promoId: 8, date: '2026-09-05T20:00:00Z', city: 'Detroit', status: 'FINAL' as const },
  { id: 16, name: 'Olympic Qualifier', sport: 'Olympic' as const, promoId: 9, date: '2026-09-02T16:00:00Z', city: 'Rome', status: 'FINAL' as const },
  { id: 17, name: 'Bellator 300', sport: 'MMA' as const, promoId: 3, date: '2026-09-25T20:00:00Z', city: 'Los Angeles', status: 'FINAL' as const }
];

export const FIGHTS = [
  { id: 1, eventId: 11, a: 1, b: 2, st: 'FINAL' as const, winner: 1, method: 'KO/TKO', round: 'R2 2:11', sport: 'MMA' as const },
  { id: 2, eventId: 11, a: 3, b: 4, st: 'FINAL' as const, winner: 3, method: 'DEC', round: 'R5 5:00', sport: 'MMA' as const },
  { id: 3, eventId: 12, a: 5, b: 6, st: 'FINAL' as const, winner: 5, method: 'UD', round: 'R12 12:00', sport: 'Boxing' as const },
  { id: 4, eventId: 12, a: 7, b: 5, st: 'FINAL' as const, winner: 5, method: 'KO/TKO', round: 'R7 2:44', sport: 'Boxing' as const },
  { id: 5, eventId: 13, a: 8, b: 9, st: 'FINAL' as const, winner: 8, method: 'KO', round: 'R3 1:12', sport: 'Muay Thai' as const },
  { id: 6, eventId: 14, a: 10, b: 11, st: 'FINAL' as const, winner: 11, method: 'DEC', round: 'R5 5:00', sport: 'Kickboxing' as const },
  { id: 7, eventId: 15, a: 12, b: 13, st: 'FINAL' as const, winner: 12, method: 'SUB', round: 'R2 3:02', sport: 'Wrestling' as const },
  { id: 8, eventId: 16, a: 14, b: 15, st: 'FINAL' as const, winner: 14, method: 'DEC', round: 'R5 5:00', sport: 'Olympic' as const },
  { id: 9, eventId: 1, a: 19, b: 18, st: 'LIVE' as const, winner: null, method: null, round: 'R2', sport: 'MMA' as const },
  { id: 10, eventId: 1, a: 1, b: 17, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'MMA' as const },
  { id: 11, eventId: 2, a: 5, b: 6, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Boxing' as const },
  { id: 12, eventId: 3, a: 8, b: 9, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Muay Thai' as const },
  { id: 13, eventId: 4, a: 10, b: 11, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Kickboxing' as const },
  { id: 14, eventId: 5, a: 12, b: 13, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Wrestling' as const },
  { id: 15, eventId: 6, a: 14, b: 15, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Olympic' as const },
  { id: 16, eventId: 1, a: 3, b: 4, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'MMA' as const },
  { id: 17, eventId: 2, a: 16, b: 7, st: 'UPCOMING' as const, winner: null, method: null, round: null, sport: 'Boxing' as const }
];

export const NEWS = [
  { source: 'ESPN MMA', category: 'UFC', title: 'Khabib Legacy dominates in title defense with grappling masterclass', time: '2h ago', sport: 'MMA' as const, emoji: '🥊', url: 'https://espn.com' },
  { source: 'BBC Sport', category: 'Boxing', title: 'Walsh retains undefeated record with knockout victory in championship bout', time: '4h ago', sport: 'Boxing' as const, emoji: '🥊', url: 'https://bbc.com' },
  { source: 'The Athletic', category: 'MMA', title: 'Ngannou Strong enters heavyweight title conversation after dominant performance', time: '6h ago', sport: 'MMA' as const, emoji: '🥊', url: 'https://theathletic.com' },
  { source: 'WWE.com', category: 'Wrestling', title: 'Championship ladder match announced for next premium live event in Miami', time: '8h ago', sport: 'Wrestling' as const, emoji: '🏆', url: 'https://wwe.com' },
  { source: 'Olympics.com', category: 'Olympic', title: 'Combat sports athletes compete in final qualification rounds for Paris 2028', time: '10h ago', sport: 'Olympic' as const, emoji: '🏅', url: 'https://olympics.com' },
  { source: 'Sky Sports', category: 'Muay Thai', title: 'Sakda displays striking excellence in stunning victory at ONE Championship', time: '12h ago', sport: 'Muay Thai' as const, emoji: '🦵', url: 'https://sky.com' },
  { source: 'MMA Junkie', category: 'MMA', title: 'Late replacement fighter steps in to face top contender at UFC 320', time: '14h ago', sport: 'MMA' as const, emoji: '⚡', url: 'https://mmajunkie.com' },
  { source: 'BoxRec', category: 'Boxing', title: 'Costa lands stunning upset in super middleweight division showdown', time: '16h ago', sport: 'Boxing' as const, emoji: '🥊', url: 'https://boxrec.com' },
  { source: 'GLORY.info', category: 'Kickboxing', title: 'Novak defeats former champion in comeback victory announcement', time: '18h ago', sport: 'Kickboxing' as const, emoji: '🥋', url: 'https://glory.info' },
  { source: 'ESPN Wrestling', category: 'AEW', title: 'Hart and Silva set for dream match at next major wrestling event', time: '20h ago', sport: 'Wrestling' as const, emoji: '🏆', url: 'https://espn.com' },
  { source: 'ONE Championship', category: 'Muay Thai', title: 'Doyle advances to tournament finals with submission victory', time: '22h ago', sport: 'Muay Thai' as const, emoji: '🦵', url: 'https://onefc.com' },
  { source: 'MMA Media', category: 'PFL', title: 'Green earns playoff spot with impressive performance in regular season finale', time: '1d ago', sport: 'MMA' as const, emoji: '⚡', url: 'https://pfl.com' }
];
