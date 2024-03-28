// src/pages/SearchPage.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsItem } from '../types';
import SearchBar from '../components/SearchBar';
import { searchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import LoadMoreButton from '../components/LoadMoreButton';
import RecentSearches from '../components/RecentSearches';

const MAX_RECENT_SEARCHES = 5;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const query = searchParams.get('query') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const loadedRecentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(loadedRecentSearches);
  }, []);

  // Fetch news items when query changes
  useEffect(() => {
    if (query) {
      setIsLoading(true); // Starts the loading indicator
      fetchSearchResults(query, page); // Fetches search results
    }
  }, [query, page]);

  // Fetch search results only when the user submits a search, not on every keystroke
  const fetchSearchResults = async (searchQuery, currentPage) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const newItems = await searchNewsItems(searchQuery, currentPage);
      setNewsItems(prevItems => currentPage === 1 ? newItems : [...prevItems, ...newItems]);
      setHasMore(newItems.length === 10);
      if (currentPage === 1 && newItems.length > 0) {
        updateRecentSearches(searchQuery); // Update recent searches here
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update recent searches
  const updateRecentSearches = (searchTerm: string): void => {
    // Ensure searchTerm is a string and not empty
    if (searchTerm.trim() === '') return;
  
    // Add the new search term to the beginning of the array, removing duplicates
    const updatedSearches = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)];
  
    // Limit the number of recent searches to store
    const recentSearchesToStore = updatedSearches.slice(0, MAX_RECENT_SEARCHES);
  
    // Update state and localStorage
    setRecentSearches(recentSearchesToStore);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearchesToStore));
  };

  // Search submission handler
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      updateRecentSearches(newQuery);
      setIsLoading(true); // Start the loading state
      setNewsItems([]); // Clear current news items
      setPage(1); // Reset page count
      setSearchParams({ query: newQuery }); // Set URL search params
      fetchSearchResults(newQuery, 1); // Explicitly fetch search results
    }
  };

  const handleLoadMore = useCallback(() => {
    // Increment page state which will trigger a re-fetch in the useEffect
    setPage(prevPage => prevPage + 1);
  }, []);

  useEffect(() => {
    if (page > 1) {
      // When page changes and it's not the first page, fetch more items
      setIsLoading(true);
      const fetchMoreResults = async () => {
        try {
          const moreItems = await searchNewsItems(query, page);
          setNewsItems(prevItems => [...prevItems, ...moreItems]);
          setHasMore(moreItems.length === 10);
        } catch (error) {
          console.error('Error fetching more search results:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMoreResults();
    }
  }, [page, query]);

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delayChildren: 0.3 },
    },
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
        <SearchBar searchQuery={query} setSearchQuery={handleSearch} ref={inputRef} />
        <span 
          className="font-bold text-xs text-gray-800 px-6 py-4"
        >
          최근 검색
        </span>
        <RecentSearches
          recentSearches={recentSearches}
          setSearchQuery={handleSearch}
          setRecentSearches={setRecentSearches}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <NewsList
            newsItems={newsItems.map((item) => ({
              ...item,
              isBookmarked: bookmarks.includes(item.id),
              voteCount: voteCounts[item.id] || item.voteCount,
            }))}
            onBookmarkToggle={toggleBookmark}
            onVote={handleVote}
          />
        )}
        {!isLoading && hasMore && (
          <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
        )}
      </motion.div>
    </ViewCountProvider>
  );
};

export default SearchPage;