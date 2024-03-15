// src/components/NewsList.tsx
import React from 'react';
import { NewsItem } from '../types';

interface Props {
  newsItems: NewsItem[];
}

const NewsList: React.FC<Props> = ({ newsItems }) => {
  return (
    <div className="mx-auto mt-2 px-4">
      {newsItems.map((newsItem, index) => (
        <div key={newsItem.id || index} className="border-b border-gray-200 p-4">
          <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline block">
            <h2 className="text-lg font-semibold text-gray-900">
              {newsItem.title}
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              {newsItem.source} - {newsItem.published_at}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
