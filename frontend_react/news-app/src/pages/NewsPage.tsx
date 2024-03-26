// src/pages/NewsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import LoadMoreButton from '../components/LoadMoreButton';
import ScrollToTopButton from '../components/ScrollToTopButton';

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null); // 에러 상태를 초기화
    try {
      const fetchedItems = await fetchNewsItems(page);
      const combinedItems = [...newsItems, ...fetchedItems];
      const uniqueItemsMap = new Map(combinedItems.map(item => [item.id, item]));
      const uniqueItems = Array.from(uniqueItemsMap.values());
      setNewsItems(uniqueItems);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching news items:', error);
      setError('Failed to load news items. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleRetry = () => {
    fetchItems();
  };

  return (
    <ViewCountProvider>
      <div className="flex flex-col min-h-screen pt-18 py-20">
        {error ? (
          <div className="text-center my-4">
            <p className="text-red-500">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <NewsList
              newsItems={newsItems.map(item => ({
                ...item,
                isBookmarked: bookmarks.includes(item.id),
                voteCount: voteCounts[item.id] || item.voteCount,
              }))}
              onBookmarkToggle={toggleBookmark}
              onVote={handleVote}
            />
            <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
          </>
        )}
        <ScrollToTopButton />
      </div>
    </ViewCountProvider>
  );
};

export default NewsPage;
