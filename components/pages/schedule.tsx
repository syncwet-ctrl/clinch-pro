'use client';

import { DashboardData } from '@/lib/types';
import EventCard from '@/components/event-card';

interface SchedulePageProps {
  data: DashboardData;
  sport: string;
}

export default function SchedulePage({ data, sport }: SchedulePageProps) {
  const filterBySport = (items: any[]) =>
    sport === 'all' ? items : items.filter((i) => i.sport === sport);

  const upcomingEvents = filterBySport(
    data.events.filter((e) => e.status !== 'FINAL')
  );

  return (
    <>
      <h1 style={{ marginBottom: '12px' }}>Schedule</h1>
      <div className="mini-grid">
        {upcomingEvents.length ? (
          upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} data={data} />
          ))
        ) : (
          <div className="empty">No upcoming events.</div>
        )}
      </div>
    </>
  );
}
