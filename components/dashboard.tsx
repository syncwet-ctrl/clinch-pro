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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data', { 
          cache: 'no-store',
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        console.error('Data fetch error:', err);
        setError((err as Error).message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Refresh every 30 seconds for live updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ margin: '0 0 10px', fontSize: '18px' }}>Loading live combat sports data...</h2>
        <p style={{ margin: '0', fontSize: '13px' }}>Pulling from ESPN, BBC, WWE, Olympics & more</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--red)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ margin: '0 0 10px', fontSize: '18px' }}>Error loading data</h2>
        <p style={{ margin: '0', fontSize: '13px' }}>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header page={page} setPage={setPage} lastUpdated={lastUpdated} />
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
