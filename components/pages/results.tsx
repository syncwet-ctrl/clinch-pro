'use client';

import { DashboardData } from '@/lib/types';
import FightCard from '@/components/fight-card';

interface ResultsPageProps {
  data: DashboardData;
  sport: string;
}

export default function ResultsPage({ data, sport }: ResultsPageProps) {
  const filterBySport = (items: any[]) =>
    sport === 'all' ? items : items.filter((i) => i.sport === sport);

  const finalFights = filterBySport(data.fights.filter((f) => f.st === 'FINAL'));

  return (
    <>
      <h1 style={{ marginBottom: '12px' }}>Results</h1>
      <div className="card">
        {finalFights.length ? (
          finalFights.map((fight) => (
            <FightCard key={fight.id} fight={fight} data={data} />
          ))
        ) : (
          <div className="empty">No results available.</div>
        )}
      </div>
    </>
  );
}
