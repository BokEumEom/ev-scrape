// src/components/NewsList.tsx
import React, { useState, useEffect } from 'react';
import { NewsItem as NewsItemType } from '../types';
import NewsItemVote from './NewsItemVote';
import { IoBookmark, IoBookmarkOutline, IoShareOutline, IoChatbubbleOutline } from 'react-icons/io5';

interface Props {
  newsItems: NewsItemType[];
  onBookmarkToggle: (newsItemId: number) => void;
  onVote: (newsId: number, voteValue: number) => void;
  incrementViewCount: (newsItemId: number) => void;
  viewCounts: ViewCounts;
}

interface ViewCounts {
  [key: number]: number;
}

const NewsList: React.FC<Props> = ({ newsItems, onBookmarkToggle, onVote, incrementViewCount, viewCounts }) => {

  const handleTitleClick = (newsItemId: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    incrementViewCount(newsItemId);
    const newsItem = newsItems.find(item => item.id === newsItemId);
    if (newsItem) {
      window.open(newsItem.link, '_blank', 'noopener,noreferrer');
    }
  };

  // 조회수가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
  }, [viewCounts]);

  const handleShare = (newsItem: NewsItemType) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        url: newsItem.link,
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that do not support `navigator.share`
      console.log('Web Share API not supported.');
    }
  };

  return (
    <div className="mx-auto px-4">
      {newsItems.map((newsItem) => (
        <div key={newsItem.id} className="border-b border-gray-200 px-4 p-4 flex flex-col">
          <div className="flex-grow">
            <a href={newsItem.link} target="_blank" rel="noopener noreferrer" 
              onClick={(event) => handleTitleClick(newsItem.id, event)}className="hover:underline">
              <h2 className="text-lg font-semibold text-gray-900">
                {newsItem.title.replace(/ - .*$/, '')}
              </h2>
            </a>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              {newsItem.source} - {new Date(newsItem.published_at).toLocaleDateString()} - 조회 {viewCounts[newsItem.id] || 0}
            </p>
            <div className="flex items-center">
              <NewsItemVote
                newsId={newsItem.id}
                onVote={onVote}
                voteCount={newsItem.voteCount}
              />
              <button
                onClick={() => onBookmarkToggle(newsItem.id)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Bookmark"
              >
                {newsItem.isBookmarked ? (
                  <IoBookmark className="text-blue-500 text-lg" size={18} />
                ) : (
                  <IoBookmarkOutline className="text-gray-500 text-lg" size={18} />
                )}
              </button>
              <button
                onClick={() => handleShare(newsItem)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Share"
              >
                <IoShareOutline className="text-gray-500 text-lg" size={18} />
              </button>
              <button
                onClick={() => handleShare(newsItem)}
                className="p-1 rounded-full hover:bg-gray-100 ml-1"
                aria-label="Share"
              >
                <IoChatbubbleOutline className="text-gray-500 text-lg" size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
