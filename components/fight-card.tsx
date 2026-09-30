'use client';

import { Fight, DashboardData } from '@/lib/types';

interface FightCardProps {
  fight: Fight;
  data: DashboardData;
}

export default function FightCard({ fight, data }: FightCardProps) {
  const fighterA = data.fighters.find((f) => f.id === fight.a);
  const fighterB = data.fighters.find((f) => f.id === fight.b);
  const event = data.events.find((e) => e.id === fight.eventId);
  const promo = data.promos.find((p) => p.id === event?.promoId);

  if (!fighterA || !fighterB || !event || !promo) return null;

  const winner = fight.winner ? data.fighters.find((f) => f.id === fight.winner) : null;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const formatTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="fight-card">
      <div className="fight-top">
        <span>
          {promo.name} · {event.name}
        </span>
        <span className={`pill ${fight.st.toLowerCase()}`}>
          {fight.st === 'LIVE' && '🔴'}
          {fight.st}
        </span>
      </div>

      <div className="fight-main">
        <div className="fighter">
          <div className="avatar">{getInitials(fighterA.name)}</div>
          <div>
            <div className="fighter-name">{fighterA.name}</div>
            <div className="fighter-meta">
              {fighterA.division} · {fighterA.wins}-{fighterA.losses}-{fighterA.draws}
            </div>
          </div>
        </div>

        <div className="center-score">
          {fight.st === 'LIVE' ? (
            <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>LIVE</span>
          ) : fight.st === 'FINAL' ? (
            <>
              <div style={{ fontWeight: 'bold' }}>{fight.method}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>R{fight.round?.split('R')[1]}</div>
            </>
          ) : (
            <span style={{ color: 'var(--accent)' }}>{formatTime(event.date)}</span>
          )}
        </div>

        <div className="fighter right">
          <div className="avatar">{getInitials(fighterB.name)}</div>
          <div>
            <div className="fighter-name">{fighterB.name}</div>
            <div className="fighter-meta">
              {fighterB.division} · {fighterB.wins}-{fighterB.losses}-{fighterB.draws}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
