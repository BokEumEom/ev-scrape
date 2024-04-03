// src/pages/BookmarksPage.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsList from '../components/NewsList';
import { fetchNewsItems } from '../services/apiService';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import Spinner from '../components/Spinner'; // Assuming a Spinner component exists
import { motion } from 'framer-motion';

const BookmarksPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  const { data: allNewsItems, isLoading, error } = useQuery({
    queryKey: ['allNewsItems'],
    // Ensure fetchNewsItems is called with valid default parameters
    queryFn: () => fetchNewsItems(1, 10)
  });

  const bookmarkedNewsItems = allNewsItems?.items?.filter(item => bookmarks.includes(item.id)) ?? [];

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

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
          newsItems={bookmarkedNewsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id),
            voteCount: voteCounts[item.id] || item.voteCount,
          }))}
          onBookmarkToggle={toggleBookmark}
          onVote={handleVote}
        />
        {bookmarkedNewsItems.length === 0 && <p className="text-center">No bookmarks added.</p>}
      </div>
      </motion.div>
    </ViewCountProvider>
  );
};

export default BookmarksPage;