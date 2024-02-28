// src/lib/useNews.ts
import { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  title: string;
  source : string;
  pubDate: string;
}

export const useNews = (page: number = 1, limit: number = 10) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensuring this runs in a client-side environment
      const fetchNews = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/news?page=${page}&limit=${limit}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setNews(data.news);
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [page, limit]);

  return { news, loading, error };
};
