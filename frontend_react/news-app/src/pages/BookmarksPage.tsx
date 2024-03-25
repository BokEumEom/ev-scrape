// src/pages/BookmarksPage.tsx
import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';

interface ViewCounts {
  [key: number]: number;
}

const BookmarksPage: React.FC = () => {
  const [bookmarkedNewsItems, setBookmarkedNewsItems] = useState<NewsItem[]>([]);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});

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

  const incrementViewCount = (newsItemId: number) => {
    setViewCounts(prevViewCounts => {
      if (!prevViewCounts.hasOwnProperty(newsItemId)) {
        // If the item isn't in the viewCounts, don't attempt to increment it.
        return prevViewCounts;
      }
      
      const newCount = (prevViewCounts[newsItemId] || 0) + 1;
      const updatedViewCounts = {
        ...prevViewCounts,
        [newsItemId]: newCount,
      };
  
      localStorage.setItem('viewCounts', JSON.stringify(updatedViewCounts));
      return updatedViewCounts;
    });
  };

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
          incrementViewCount={incrementViewCount}
          viewCounts={viewCounts}
        />
      ) : (
        <p className="text-center">No bookmarks added.</p>
      )}
    </div>
  );
};

export default BookmarksPage;
