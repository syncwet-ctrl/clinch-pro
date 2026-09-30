'use client';

import { DashboardData } from '@/lib/types';

interface RankingsPageProps {
  data: DashboardData;
  sport: string;
}

export default function RankingsPage({ data, sport }: RankingsPageProps) {
  const sports = sport === 'all' ? ['MMA', 'Boxing', 'Kickboxing', 'Muay Thai', 'Wrestling', 'Olympic'] : [sport];

  return (
    <>
      <h1 style={{ marginBottom: '12px' }}>Rankings</h1>
      {sports.map((s) => {
        const rankings = data.rankings
          .filter((r) => r.sport === s)
          .slice(0, 10);

        return (
          <section key={s} className="section">
            <h2 style={{ marginBottom: '10px' }}>{s}</h2>
            <div className="card card-pad">
              {rankings.length ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Fighter</th>
                        <th>Division</th>
                        <th>Record</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankings.map((r, i) => (
                        <tr key={r.fighterId}>
                          <td>{i + 1}</td>
                          <td>{r.name}</td>
                          <td>{r.division}</td>
                          <td>{r.record}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty">No rankings available.</div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
