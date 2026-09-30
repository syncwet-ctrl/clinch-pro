'use client';

type PageType = 'home' | 'live' | 'schedule' | 'results' | 'rankings' | 'news';

interface HeaderProps {
  page: PageType;
  setPage: (page: PageType) => void;
  lastUpdated: Date;
}

export default function Header({ page, setPage, lastUpdated }: HeaderProps) {
  const navItems: Array<[PageType, string]> = [
    ['home', 'Home'],
    ['live', 'Live'],
    ['schedule', 'Schedule'],
    ['results', 'Results'],
    ['rankings', 'Rankings'],
    ['news', 'News']
  ];

  const updateTime = lastUpdated.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#" onClick={() => setPage('home')}>
          <span>◢</span> <span>CLINCH<span className="dot">.</span></span>
        </a>
        <nav className="top-nav">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              className={`nav-item ${page === key ? 'active' : ''}`}
              onClick={() => setPage(key)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="update-badge">Updated {updateTime}</div>
          <button className="icon-btn" aria-label="Search">🔍</button>
          <button className="icon-btn" aria-label="Theme">◐</button>
        </div>
      </div>
    </header>
  );
}
