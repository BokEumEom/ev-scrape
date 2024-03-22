// src/pages/BookmarksPage.tsx
import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';

const BookmarksPage: React.FC = () => {
  const [bookmarkedNewsItems, setBookmarkedNewsItems] = useState<NewsItem[]>([]);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  useEffect(() => {
    const fetchAndFilterBookmarkedNewsItems = async () => {
      try {
        const allNewsItems: NewsItem[] = await fetchNewsItems();
        const filteredBookmarkedItems: NewsItem[] = allNewsItems.filter((item: NewsItem) =>
          bookmarks.includes(item.id),
        );
        setBookmarkedNewsItems(filteredBookmarkedItems);
      } catch (error) {
        console.error('Failed to fetch news items:', error);
      }
    };

    fetchAndFilterBookmarkedNewsItems();
  }, [bookmarks]);

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-20">
      {bookmarkedNewsItems.length > 0 ? (
        <NewsList
          newsItems={bookmarkedNewsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id),
            voteCount: voteCounts[item.id] || item.voteCount,
          }))}
          onBookmarkToggle={toggleBookmark}
          onVote={handleVote}
        />
      ) : (
        <p className="text-center">No bookmarks added.</p>
      )}
    </div>
  );
};

export default BookmarksPage;
