// src/components/SearchResults.tsx
import React from 'react';
import { NewsItem } from '../types';

interface SearchResultsProps {
  newsItems: NewsItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ newsItems }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {newsItems.map((item) => {
        // Remove the source part from the title if present
        const titleWithoutSource = item.title.replace(/ - .+$/, '');
        return (
          <li key={item.id} className="px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-900">{titleWithoutSource}</h3>
            {/* Other item details */}
            <p className="text-gray-600">{item.summary}</p>
            {/* ... */}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
