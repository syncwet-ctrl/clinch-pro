'use client';

type PageType = 'home' | 'live' | 'schedule' | 'results' | 'rankings' | 'news';

interface SidebarProps {
  sport: string;
  setSport: (sport: string) => void;
  setPage: (page: PageType) => void;
}

export default function Sidebar({ sport, setSport, setPage }: SidebarProps) {
  const sports = ['all', 'MMA', 'Boxing', 'Kickboxing', 'Muay Thai', 'Wrestling', 'Olympic'];

  return (
    <aside className="sidebar">
      <div className="side-section">
        <h3 className="side-title">Sports</h3>
        {sports.map((s) => (
          <button
            key={s}
            className={`side-item ${sport === s ? 'active' : ''}`}
            onClick={() => setSport(s)}
          >
            {s === 'all' ? 'All sports' : s}
          </button>
        ))}
      </div>

      <div className="side-section">
        <h3 className="side-title">Tools</h3>
        <button className="side-item" onClick={() => setPage('rankings')}>
          Rankings
        </button>
        <button className="side-item" onClick={() => setPage('news')}>
          News
        </button>
      </div>
    </aside>
  );
}
