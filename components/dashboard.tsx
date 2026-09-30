'use client';

import { useEffect, useState } from 'react';
import { DashboardData } from '@/lib/types';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import HomePage from '@/components/pages/home';
import LivePage from '@/components/pages/live';
import SchedulePage from '@/components/pages/schedule';
import ResultsPage from '@/components/pages/results';
import RankingsPage from '@/components/pages/rankings';
import NewsPage from '@/components/pages/news';

type PageType = 'home' | 'live' | 'schedule' | 'results' | 'rankings' | 'news';

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [page, setPage] = useState<PageType>('home');
  const [sport, setSport] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch data');
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error('Data fetch error:', err);
        setError((err as Error).message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
        <p>Loading combat sports data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--red)' }}>
        <p>Failed to load data. Please refresh.</p>
      </div>
    );
  }

  return (
    <>
      <Header page={page} setPage={setPage} />
      <div className="page">
        <Sidebar sport={sport} setSport={setSport} setPage={setPage} />
        <main className="main" tabIndex={-1}>
          {page === 'home' && <HomePage data={data} sport={sport} />}
          {page === 'live' && <LivePage data={data} sport={sport} />}
          {page === 'schedule' && <SchedulePage data={data} sport={sport} />}
          {page === 'results' && <ResultsPage data={data} sport={sport} />}
          {page === 'rankings' && <RankingsPage data={data} sport={sport} />}
          {page === 'news' && <NewsPage data={data} sport={sport} />}
        </main>
      </div>
    </>
  );
}
