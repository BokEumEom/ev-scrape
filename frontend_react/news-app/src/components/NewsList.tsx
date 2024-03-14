// src/components/NewsList.tsx
import React from 'react';
import { NewsItem } from '../types';

interface Props {
  newsItems: NewsItem[];
}

const NewsList: React.FC<Props> = ({ newsItems }) => {
  return (
    <div className="max-w-4xl mx-auto mt-2 px-4">
      {newsItems.map(newsItem => (
        <div
          key={newsItem.id} // Ensure each key is unique.
          className="border-b border-gray-200 py-4 mb-4 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none"
          tabIndex={0} // Make div focusable for keyboard navigation.
          aria-label={`Read more about ${newsItem.title}`} // Accessibility label for screen readers.
        >
          {/* Use Tailwind's responsive font sizes for title */}
          <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="group">
            <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 focus:text-blue-600">
              {newsItem.title}
            </h2>
          </a>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            {newsItem.source} {newsItem.published_at}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
