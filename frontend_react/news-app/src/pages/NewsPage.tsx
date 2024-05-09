// src/pages/NewsPage.tsx
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/news/NewsList';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import LoadMoreButton from '../components/LoadMoreButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';

const NewsPage: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['newsItems'],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchNewsItems(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      // Assuming each response includes a 'total' count for all pages
      const morePagesExist = allPages.flatMap(page => page.items).length < lastPage.total;
      if (morePagesExist) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: undefined, // Or some other value if there's a better one
  });

  if (isError) return <div>Error: {error?.message}</div>;
  if (isLoading) return <Spinner />;

  const newsItems = data?.pages.flatMap(page => page.items) || [];

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <ViewCountProvider>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="flex flex-col min-h-screen pt-16 pb-20"
      >
      <div>
        <NewsList
          newsItems={newsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id),
            voteCount: voteCounts[item.id] || item.voteCount,
          }))}
          onBookmarkToggle={toggleBookmark}
          onVote={handleVote}
        />
        {hasNextPage && <LoadMoreButton isLoading={isLoading} onClick={() => fetchNextPage()} />}
        <ScrollToTopButton />
      </div>
      </motion.div>
    </ViewCountProvider>
  );
};

export default NewsPage;

