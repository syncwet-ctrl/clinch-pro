// MMA Data - Using ESPN/MMA Junkie RSS + fallback
export async function fetchMMAEvents() {
  const rss = 'https://www.espn.com/espn/rss/mma/news';
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items || null;
  } catch (error) {
    console.warn('MMA events fetch failed:', error);
    return null;
  }
}

// Boxing Data - Using BoxRec RSS + ESPN
export async function fetchBoxingEvents() {
  const rss = 'https://www.bbc.co.uk/sport/boxing/rss.xml';
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items || null;
  } catch (error) {
    console.warn('Boxing events fetch failed:', error);
    return null;
  }
}

// Muay Thai Data - Using ONE Championship + Sky Sports
export async function fetchMuayThaiEvents() {
  const rss = 'https://www.skyboxing.co.uk/';
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items || null;
  } catch (error) {
    console.warn('Muay Thai events fetch failed:', error);
    return null;
  }
}

// Kickboxing Data - Using GLORY Kickboxing RSS
export async function fetchKickboxingEvents() {
  // GLORY Kickboxing events
  const urls = [
    'https://www.bbc.co.uk/sport/kickboxing/rss.xml',
  ];
  
  try {
    for (const rss of urls) {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.items) return data.items;
      }
    }
  } catch (error) {
    console.warn('Kickboxing events fetch failed:', error);
  }
  return null;
}

// Wrestling Data - Using WWE RSS + AEW RSS
export async function fetchWrestlingEvents() {
  const feeds = [
    'https://www.wwe.com/rss/news',
    'https://www.aew.com/news'
  ];
  
  try {
    for (const rss of feeds) {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
          { cache: 'no-store' }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.items) return data.items;
        }
      } catch (e) {
        continue;
      }
    }
  } catch (error) {
    console.warn('Wrestling events fetch failed:', error);
  }
  return null;
}

// Olympic Combat Data - Using Olympics.com RSS
export async function fetchOlympicEvents() {
  const rss = 'https://olympics.com/en/news/rss';
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items?.filter((item: any) => 
      /judo|taekwondo|boxing|wrestling|combat/i.test(item.title)
    ) || null;
  } catch (error) {
    console.warn('Olympic events fetch failed:', error);
    return null;
  }
}

// News Data - Aggregated from all major combat sports sources
export async function fetchAllNews() {
  const allFeeds = [
    { url: 'https://www.espn.com/espn/rss/mma/news', sport: 'MMA' },
    { url: 'https://www.bbc.co.uk/sport/boxing/rss.xml', sport: 'Boxing' },
    { url: 'https://www.bbc.co.uk/sport/mixed-martial-arts/rss.xml', sport: 'MMA' },
    { url: 'https://www.wwe.com/rss/news', sport: 'Wrestling' },
    { url: 'https://olympics.com/en/news/rss', sport: 'Olympic' },
    { url: 'https://www.skyboxing.co.uk/feed', sport: 'Muay Thai' },
  ];

  const allNews: any[] = [];

  for (const feed of allFeeds) {
    try {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
        { cache: 'no-store' }
      );

      if (!res.ok) continue;

      const data = await res.json();
      if (!data.items || !Array.isArray(data.items)) continue;

      for (const item of data.items.slice(0, 3)) {
        allNews.push({
          title: item.title || 'Latest story',
          source: data.feed?.title || feed.sport,
          sport: feed.sport,
          time: formatTime(item.pubDate),
          url: item.link,
          emoji: getEmoji(feed.sport),
          category: categorizeNews(item.title || '')
        });
      }
    } catch (error) {
      console.warn(`Failed to fetch ${feed.sport} news:`, error);
    }
  }

  return allNews;
}

function formatTime(dateString?: string) {
  if (!dateString) return 'recently';
  try {
    const diff = Math.max(1, Math.round((Date.now() - new Date(dateString).getTime()) / 60000));
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.round(diff / 60)}h ago`;
    return `${Math.round(diff / 1440)}d ago`;
  } catch (error) {
    return 'recently';
  }
}

function getEmoji(sport: string) {
  const map: Record<string, string> = {
    MMA: '🥊',
    Boxing: '🥊',
    'Muay Thai': '🦵',
    Kickboxing: '🥋',
    Wrestling: '🏆',
    Olympic: '🏅'
  };
  return map[sport] || '📰';
}

function categorizeNews(title: string) {
  if (/fight|bout|match|event|card/i.test(title)) return 'Event';
  if (/injury|withdraw|cancel|illness/i.test(title)) return 'Injury';
  if (/rank|ranking|top|best|champion/i.test(title)) return 'Rankings';
  if (/record|victory|defeat|win|lose|result/i.test(title)) return 'Result';
  if (/announcement|sign|deal|promotion/i.test(title)) return 'News';
  return 'General';
}
