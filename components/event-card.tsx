'use client';

import { EventItem, DashboardData } from '@/lib/types';

interface EventCardProps {
  event: EventItem;
  data: DashboardData;
}

export default function EventCard({ event, data }: EventCardProps) {
  const promo = data.promos.find((p) => p.id === event.promoId);
  const mainFight = data.fights.find((f) => f.eventId === event.id);
  const fighterA = mainFight ? data.fighters.find((f) => f.id === mainFight.a) : null;
  const fighterB = mainFight ? data.fighters.find((f) => f.id === mainFight.b) : null;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="event-card">
      <div className="fight-top">
        <span>
          {promo?.name} · {event.sport}
        </span>
        <span className={`pill ${event.status.toLowerCase()}`}>{event.status}</span>
      </div>
      <h3 style={{ margin: '10px 0 8px', fontSize: '15px', fontWeight: '800' }}>{event.name}</h3>
      <div className="meta">
        {formatDate(event.date)} · {formatTime(event.date)} · {event.city}
      </div>
      {fighterA && fighterB && (
        <div className="meta" style={{ marginTop: '8px', fontWeight: '700' }}>
          {fighterA.name} vs {fighterB.name}
        </div>
      )}
    </div>
  );
}
