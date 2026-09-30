'use client';

import { DashboardData } from '@/lib/types';
import NewsCard from '@/components/news-card';

interface NewsPageProps {
  data: DashboardData;
  sport: string;
}

export default function NewsPage({ data, sport }: NewsPageProps) {
  const filterBySport = (items: any[]) =>
    sport === 'all' ? items : items.filter((i) => i.sport === sport);

  const news = filterBySport(data.news);

  return (
    <>
      <h1 style={{ marginBottom: '12px' }}>News</h1>
      <small style={{ color: 'var(--muted)', marginBottom: '20px', display: 'block' }}>
        Latest from ESPN, BBC, WWE, Olympics and more
      </small>
      <div className="card">
        {news.length ? (
          news.map((item, i) => (
            <NewsCard key={i} news={item} />
          ))
        ) : (
          <div className="empty">No news available.</div>
        )}
      </div>
    </>
  );
}
