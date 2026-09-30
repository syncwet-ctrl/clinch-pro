export const SPORTS = ['MMA', 'Boxing', 'Kickboxing', 'Muay Thai', 'Wrestling', 'Olympic'] as const;

export const PROMOS = [
  { id: 1, name: 'UFC', sport: 'MMA', country: 'USA' },
  { id: 2, name: 'PFL', sport: 'MMA', country: 'USA' },
  { id: 3, name: 'Bellator', sport: 'MMA', country: 'USA' },
  { id: 4, name: 'Top Rank', sport: 'Boxing', country: 'USA' },
  { id: 5, name: 'Matchroom', sport: 'Boxing', country: 'UK' },
  { id: 6, name: 'ONE Championship', sport: 'Muay Thai', country: 'Singapore' },
  { id: 7, name: 'GLORY', sport: 'Kickboxing', country: 'Netherlands' },
  { id: 8, name: 'WWE', sport: 'Wrestling', country: 'USA' },
  { id: 9, name: 'Olympics', sport: 'Olympic', country: 'International' },
  { id: 10, name: 'Rizin', sport: 'MMA', country: 'Japan' }
] as const;

export const FIGHTERS = [
  { id: 1, name: 'Marcus Vega', sport: 'MMA', division: 'Welterweight', nationality: 'USA', promoId: 1, wins: 19, losses: 2, draws: 0, ko: 9, sub: 3, dec: 7, age: 30, height: 183, reach: 190, stance: 'Orthodox', rank: 1 },
  { id: 2, name: 'Diego Okafor', sport: 'MMA', division: 'Welterweight', nationality: 'Brazil', promoId: 1, wins: 16, losses: 4, draws: 0, ko: 7, sub: 2, dec: 7, age: 29, height: 181, reach: 188, stance: 'Orthodox', rank: 2 },
  { id: 3, name: 'Ivan Petrov', sport: 'MMA', division: 'Middleweight', nationality: 'Russia', promoId: 10, wins: 18, losses: 3, draws: 0, ko: 7, sub: 4, dec: 7, age: 31, height: 185, reach: 196, stance: 'Southpaw', rank: 3 },
  { id: 4, name: 'Kenji Tanaka', sport: 'MMA', division: 'Middleweight', nationality: 'Japan', promoId: 10, wins: 15, losses: 5, draws: 0, ko: 9, sub: 1, dec: 5, age: 32, height: 182, reach: 194, stance: 'Orthodox', rank: 4 },
  { id: 5, name: 'Liam Walsh', sport: 'Boxing', division: 'Super Middleweight', nationality: 'UK', promoId: 5, wins: 23, losses: 1, draws: 0, ko: 13, sub: 0, dec: 10, age: 28, height: 182, reach: 188, stance: 'Orthodox', rank: 1 },
  { id: 6, name: 'Tariq Costa', sport: 'Boxing', division: 'Super Middleweight', nationality: 'Brazil', promoId: 4, wins: 21, losses: 2, draws: 1, ko: 11, sub: 0, dec: 10, age: 30, height: 181, reach: 186, stance: 'Southpaw', rank: 2 },
  { id: 7, name: 'Noah Reyes', sport: 'Boxing', division: 'Light Heavyweight', nationality: 'USA', promoId: 4, wins: 24, losses: 3, draws: 0, ko: 18, sub: 0, dec: 6, age: 31, height: 189, reach: 197, stance: 'Orthodox', rank: 3 },
  { id: 8, name: 'Rafael Sakda', sport: 'Muay Thai', division: 'Lightweight', nationality: 'Thailand', promoId: 6, wins: 27, losses: 4, draws: 0, ko: 18, sub: 0, dec: 9, age: 29, height: 176, reach: 182, stance: 'Orthodox', rank: 1 },
  { id: 9, name: 'Somchai Doyle', sport: 'Muay Thai', division: 'Lightweight', nationality: 'Thailand', promoId: 6, wins: 24, losses: 6, draws: 0, ko: 16, sub: 0, dec: 8, age: 31, height: 178, reach: 184, stance: 'Orthodox', rank: 2 },
  { id: 10, name: 'Declan Lemaire', sport: 'Kickboxing', division: 'Lightweight', nationality: 'France', promoId: 7, wins: 20, losses: 3, draws: 0, ko: 12, sub: 0, dec: 8, age: 29, height: 180, reach: 185, stance: 'Orthodox', rank: 1 },
  { id: 11, name: 'Andre Novak', sport: 'Kickboxing', division: 'Lightweight', nationality: 'Croatia', promoId: 7, wins: 18, losses: 4, draws: 0, ko: 11, sub: 0, dec: 7, age: 27, height: 181, reach: 187, stance: 'Southpaw', rank: 2 },
  { id: 12, name: 'Yuto Silva', sport: 'Wrestling', division: 'Heavyweight', nationality: 'Japan', promoId: 8, wins: 22, losses: 8, draws: 0, ko: 0, sub: 0, dec: 0, age: 35, height: 193, reach: 198, stance: 'Orthodox', rank: 1 },
  { id: 13, name: 'Mateo Hart', sport: 'Wrestling', division: 'Heavyweight', nationality: 'USA', promoId: 8, wins: 24, losses: 6, draws: 0, ko: 0, sub: 0, dec: 0, age: 34, height: 196, reach: 201, stance: 'Orthodox', rank: 2 },
  { id: 14, name: 'Sean Moreau', sport: 'Olympic', division: 'Featherweight', nationality: 'France', promoId: 9, wins: 13, losses: 2, draws: 0, ko: 4, sub: 2, dec: 7, age: 24, height: 176, reach: 178, stance: 'Orthodox', rank: 1 },
  { id: 15, name: 'Viktor Kade', sport: 'Olympic', division: 'Welterweight', nationality: 'Germany', promoId: 9, wins: 12, losses: 3, draws: 0, ko: 3, sub: 3, dec: 6, age: 23, height: 181, reach: 185, stance: 'Orthodox', rank: 2 }
] as const;

export const EVENTS = [
  { id: 1, name: 'UFC 320', sport: 'MMA', promoId: 1, date: '2026-09-30T20:00:00Z', city: 'Las Vegas', status: 'LIVE' },
  { id: 2, name: 'Top Rank Live', sport: 'Boxing', promoId: 4, date: '2026-10-02T22:00:00Z', city: 'Las Vegas', status: 'UPCOMING' },
  { id: 3, name: 'ONE Championship 25', sport: 'Muay Thai', promoId: 6, date: '2026-10-03T19:30:00Z', city: 'Bangkok', status: 'UPCOMING' },
  { id: 4, name: 'GLORY 31', sport: 'Kickboxing', promoId: 7, date: '2026-10-05T18:00:00Z', city: 'Rotterdam', status: 'UPCOMING' },
  { id: 5, name: 'WWE Clash at the Coast', sport: 'Wrestling', promoId: 8, date: '2026-10-08T20:00:00Z', city: 'Miami', status: 'UPCOMING' },
  { id: 6, name: 'Olympic Combat Finals', sport: 'Olympic', promoId: 9, date: '2026-10-15T17:00:00Z', city: 'Paris', status: 'UPCOMING' },
  { id: 11, name: 'UFC 319', sport: 'MMA', promoId: 1, date: '2026-09-22T20:00:00Z', city: 'Toronto', status: 'FINAL' },
  { id: 12, name: 'Top Rank Night', sport: 'Boxing', promoId: 4, date: '2026-09-15T22:00:00Z', city: 'New York', status: 'FINAL' },
  { id: 13, name: 'ONE Championship 24', sport: 'Muay Thai', promoId: 6, date: '2026-09-18T19:30:00Z', city: 'Singapore', status: 'FINAL' },
  { id: 14, name: 'GLORY 30', sport: 'Kickboxing', promoId: 7, date: '2026-09-10T18:00:00Z', city: 'Amsterdam', status: 'FINAL' },
  { id: 15, name: 'WWE Raw Showcase', sport: 'Wrestling', promoId: 8, date: '2026-09-05T20:00:00Z', city: 'Detroit', status: 'FINAL' },
  { id: 16, name: 'Olympic Qualifier', sport: 'Olympic', promoId: 9, date: '2026-09-02T16:00:00Z', city: 'Rome', status: 'FINAL' }
] as const;

export const FIGHTS = [
  { id: 1, eventId: 11, a: 1, b: 2, st: 'FINAL', winner: 1, method: 'KO/TKO', round: 'R2 2:11', sport: 'MMA' },
  { id: 2, eventId: 11, a: 3, b: 4, st: 'FINAL', winner: 3, method: 'DEC', round: 'R5 5:00', sport: 'MMA' },
  { id: 3, eventId: 12, a: 5, b: 6, st: 'FINAL', winner: 5, method: 'UD', round: 'R12 12:00', sport: 'Boxing' },
  { id: 4, eventId: 12, a: 7, b: 5, st: 'FINAL', winner: 5, method: 'KO/TKO', round: 'R7 2:44', sport: 'Boxing' },
  { id: 5, eventId: 13, a: 8, b: 9, st: 'FINAL', winner: 8, method: 'KO', round: 'R3 1:12', sport: 'Muay Thai' },
  { id: 6, eventId: 14, a: 10, b: 11, st: 'FINAL', winner: 11, method: 'DEC', round: 'R5 5:00', sport: 'Kickboxing' },
  { id: 7, eventId: 15, a: 12, b: 13, st: 'FINAL', winner: 12, method: 'SUB', round: 'R2 3:02', sport: 'Wrestling' },
  { id: 8, eventId: 16, a: 14, b: 15, st: 'FINAL', winner: 14, method: 'DEC', round: 'R5 5:00', sport: 'Olympic' },
  { id: 9, eventId: 1, a: 1, b: 3, st: 'LIVE', winner: null, method: null, round: 'R2', sport: 'MMA' },
  { id: 10, eventId: 2, a: 5, b: 6, st: 'UPCOMING', winner: null, method: null, round: null, sport: 'Boxing' },
  { id: 11, eventId: 3, a: 8, b: 9, st: 'UPCOMING', winner: null, method: null, round: null, sport: 'Muay Thai' },
  { id: 12, eventId: 4, a: 10, b: 11, st: 'UPCOMING', winner: null, method: null, round: null, sport: 'Kickboxing' }
] as const;

export const NEWS = [
  { source: 'ESPN', category: 'MMA', title: 'UFC title picture tightens as contenders stack up after dramatic weekend', time: '1h ago', sport: 'MMA', emoji: '🥊' },
  { source: 'BBC Sport', category: 'Boxing', title: 'World title eliminator headlines next big boxing weekend', time: '2h ago', sport: 'Boxing', emoji: '🥊' },
  { source: 'WWE', category: 'Wrestling', title: 'Major championship match set for next premium live event', time: '3h ago', sport: 'Wrestling', emoji: '🏆' },
  { source: 'Olympics.com', category: 'Olympic', title: 'Olympic combat athletes set for final qualification rounds', time: '4h ago', sport: 'Olympic', emoji: '🏅' },
  { source: 'Sky Sports', category: 'Muay Thai', title: 'Glorious strike exchange puts Thai star back in global contention', time: '6h ago', sport: 'Muay Thai', emoji: '🦵' },
  { source: 'ESPN', category: 'Kickboxing', title: 'Title challenger pushes forward with a statement win and rematch callout', time: '8h ago', sport: 'Kickboxing', emoji: '🥋' }
] as const;
