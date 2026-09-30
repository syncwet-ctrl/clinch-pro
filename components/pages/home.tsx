'use client';

import { DashboardData } from '@/lib/types';
import FightCard from '@/components/fight-card';
import EventCard from '@/components/event-card';
import NewsCard from '@/components/news-card';
import RankingsWidget from '@/components/rankings-widget';

interface HomePageProps {
  data: DashboardData;
  sport: string;
}

export default function HomePage({ data, sport }: HomePageProps) {
  const filterBySport = (items: any[]) =>
    sport === 'all' ? items : items.filter((i) => i.sport === sport);

  const liveFights = filterBySport(data.fights.filter((f) => f.st === 'LIVE'));
  const upcomingEvents = filterBySport(data.events.filter((e) => e.status === 'UPCOMING')).slice(0, 4);
  const latestResults = filterBySport(data.fights.filter((f) => f.st === 'FINAL')).slice(0, 5);
  const trendingNews = filterBySport(data.news).slice(0, 4);

  return (
    <div className="grid-2">
      <div>
        <section className="section">
          <div className="section-head">
            <h2>Live now</h2>
          </div>
          <div className="card">
            {liveFights.length ? (
              liveFights.map((fight) => (
                <FightCard key={fight.id} fight={fight} data={data} />
              ))
            ) : (
              <div className="empty">No fights live right now.</div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Upcoming events</h2>
            <a href="#" className="text-link">
              View all ›
            </a>
          </div>
          <div className="mini-grid">
            {upcomingEvents.length ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} data={data} />
              ))
            ) : (
              <div className="empty">No upcoming events.</div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Latest results</h2>
            <a href="#" className="text-link">
              See all ›
            </a>
          </div>
          <div className="card">
            {latestResults.length ? (
              latestResults.map((fight) => (
                <FightCard key={fight.id} fight={fight} data={data} />
              ))
            ) : (
              <div className="empty">No results yet.</div>
            )}
          </div>
        </section>
      </div>

      <div>
        <section className="section">
          <div className="section-head">
            <h2>Top rankings</h2>
          </div>
          <RankingsWidget data={data} sport={sport} />
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Latest news</h2>
            <a href="#" className="text-link">
              More ›
            </a>
          </div>
          <div className="card">
            {trendingNews.length ? (
              trendingNews.map((news, i) => (
                <NewsCard key={i} news={news} />
              ))
            ) : (
              <div className="empty">No news available.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
