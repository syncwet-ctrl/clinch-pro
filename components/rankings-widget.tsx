'use client';

import { DashboardData } from '@/lib/types';

interface RankingsWidgetProps {
  data: DashboardData;
  sport: string;
}

export default function RankingsWidget({ data, sport }: RankingsWidgetProps) {
  const sportToShow = sport === 'all' ? 'MMA' : sport;
  const rankings = data.rankings
    .filter((r) => r.sport === sportToShow)
    .slice(0, 5);

  return (
    <div className="card card-pad">
      {rankings.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Fighter</th>
                <th>Record</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((r) => (
                <tr key={r.fighterId}>
                  <td>{r.rank}</td>
                  <td>{r.name}</td>
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
  );
}
