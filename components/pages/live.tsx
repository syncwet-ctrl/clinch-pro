'use client';

import { DashboardData } from '@/lib/types';
import FightCard from '@/components/fight-card';

interface LivePageProps {
  data: DashboardData;
  sport: string;
}

export default function LivePage({ data, sport }: LivePageProps) {
  const filterBySport = (items: any[]) =>
    sport === 'all' ? items : items.filter((i) => i.sport === sport);

  const liveFights = filterBySport(data.fights.filter((f) => f.st === 'LIVE'));
  const nextFights = filterBySport(
    data.fights.filter((f) => f.st === 'UPCOMING')
  ).slice(0, 3);

  return (
    <>
      <h1 style={{ marginBottom: '12px' }}>Live fights</h1>
      <div className="card">
        {liveFights.length ? (
          liveFights.map((fight) => (
            <FightCard key={fight.id} fight={fight} data={data} />
          ))
        ) : (
          <div className="empty">No fights are live right now.</div>
        )}
      </div>

      {nextFights.length > 0 && (
        <section className="section" style={{ marginTop: '20px' }}>
          <div className="section-head">
            <h2>Coming up next</h2>
          </div>
          <div className="card">
            {nextFights.map((fight) => (
              <FightCard key={fight.id} fight={fight} data={data} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
