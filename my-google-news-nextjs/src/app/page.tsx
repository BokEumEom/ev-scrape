// src/page.tsx
"use client";

import React from 'react';
import { useNews } from '@/lib/useNews'; // Adjust the import path as needed
import { NewsList } from '@/components/NewsList'; // Adjust the import path as needed

export default function Home() {
  const { news, loading, error } = useNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {news.map((article) => (
        <NewsList
          key={article.id}
          id={article.id}
          title={article.title}
          source={article.source}
          pubDate={article.pubDate}
        />
      ))}
    </div>
  );
}
