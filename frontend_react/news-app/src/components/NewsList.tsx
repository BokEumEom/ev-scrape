// src/components/NewsList.tsx
import React from 'react';
import { NewsItem as NewsItemType } from '../types';
import NewsItemVote from './NewsItemVote'; // Import the NewsItemVote component
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

interface Props {
  newsItems: NewsItemType[];
  onBookmarkToggle: (newsItemId: number) => void;
  onVote: (newsId: number, voteValue: number) => void;
}

const NewsList: React.FC<Props> = ({ newsItems, onBookmarkToggle, onVote }) => {
  return (
    <div className="mx-auto px-4">
      {newsItems.map((newsItem) => (
        // Make sure `key` is unique for each news item.
        // The unique `id` from each news item is a good candidate for `key`.
        <div key={newsItem.id} className="border-b border-gray-200 p-4 flex flex-col">
          <div className="flex-grow">
            <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <h2 className="text-lg font-semibold text-gray-900">
                {newsItem.title.replace(/ - .*$/, '')}
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                {newsItem.source} - {new Date(newsItem.published_at).toLocaleDateString()}
              </p>
            </a>
          </div>
          <div className="flex justify-between items-center">
            <NewsItemVote
              newsId={newsItem.id}
              onVote={onVote}
              voteCount={newsItem.voteCount} // This prop needs to be provided from the parent component
            />
            <button
              onClick={() => onBookmarkToggle(newsItem.id)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Bookmark"
            >
              {newsItem.isBookmarked ? (
                <IoBookmark className="text-blue-500" size={18} />
              ) : (
                <IoBookmarkOutline size={18} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
