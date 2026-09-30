'use client';

import { NewsItem } from '@/lib/types';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="news-card">
      <div className="news-thumb">{news.emoji}</div>
      <div className="news-body">
        <div className="news-tag">{news.source}</div>
        <div className="news-title">{news.title}</div>
        <div className="news-meta">
          <span>{news.time}</span>
          <span>•</span>
          <span>{news.sport}</span>
        </div>
      </div>
    </div>
  );
}
