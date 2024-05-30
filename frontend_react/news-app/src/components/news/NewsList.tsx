// src/components/news/NewsList.tsx
import React from 'react';
import { NewsItem as NewsItemType } from '@/types';
import NewsItem from './NewsItem';

interface Props {
  newsItems: NewsItemType[];
  onBookmarkToggle: (newsItemId: number) => void;
  onVote: (newsId: number, voteValue: number) => void;
}

const NewsList: React.FC<Props> = ({ newsItems, onBookmarkToggle, onVote }) => {
  return (
    <div className="mx-auto px-4">
      {newsItems.map(newsItem => (
        <NewsItem
          key={newsItem.id}
          newsItem={newsItem}
          onBookmarkToggle={onBookmarkToggle}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default NewsList;
