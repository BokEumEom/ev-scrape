// src/components/NewsList.tsx
import React from 'react';
import { NewsItem } from '../types';

interface Props {
  newsItems: NewsItem[];
}

const NewsList: React.FC<Props> = ({ newsItems }) => {
  return (
    <div className="mx-auto mt-2 px-4">
      {newsItems.map((newsItem, index) => {
        // Check if the newsItem has a unique id, if not, use a combination of index and some unique property like title.
        const keyId = newsItem.id ? `${newsItem.id}` : `${index}-${newsItem.title}`;
        return (
          <div key={keyId} className="border-b border-gray-200 p-4">
            <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline block">
              <h2 className="text-lg font-semibold text-gray-900">
                {newsItem.title.replace(/ - .*$/, '')} {/* Remove the source part from the title if present */}
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                {newsItem.source} - {new Date(newsItem.published_at).toLocaleDateString()}
              </p>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
