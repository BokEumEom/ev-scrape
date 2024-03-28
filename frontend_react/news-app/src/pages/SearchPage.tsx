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

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // Initially false until search is performed
  const [isLoading, setIsLoading] = useState(false);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const query = searchParams.get('query') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus the search input when the component is mounted
  useEffect(() => {
    if (!query) {
      inputRef.current?.focus();
    }
  }, []);

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { duration: 0.5, delayChildren: 0.3 } 
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  useEffect(() => {
    if (!query) {
      // 쿼리가 없을 경우 로딩 상태를 해제하고 함수를 종료합니다.
      setIsLoading(false);
      setNewsItems([]); // 기존 뉴스 아이템을 초기화합니다.
      return;
    }
    // 검색 쿼리가 있을 경우 페이지와 관련 상태를 초기화합니다.
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    setNewsItems([]); // 새 검색 시 이전 결과를 초기화합니다.
  }, [query]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const newItems = await searchNewsItems(query, page);
        setNewsItems(prevItems => {
          // 모든 이전 아이템과 새로운 아이템을 결합한 뒤 중복을 제거합니다.
          const combinedItems = [...prevItems, ...newItems];
          const uniqueItems = Array.from(new Set(combinedItems.map(item => item.id)))
            .map(id => combinedItems.find(item => item.id === id)!);
          return uniqueItems;
        });
        setHasMore(newItems.length === 10);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchItems();
  }, [query, page]);  

  useEffect(() => {
    if (query) {
      setPage(1);
      setHasMore(true);
    }
  }, [query]);  

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const updateSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
    // Update the search parameters in the URL
    setSearchParams({ query: newQuery });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="flex flex-col min-h-screen pt-16 pb-20"
    >
      <ViewCountProvider>
        {/* Pass down the searchQuery and update function to SearchBar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={updateSearchQuery} ref={inputRef} />
        {query ? (
          <>
            {isLoading && <Spinner />}
            <NewsList
              newsItems={newsItems.map(item => ({
                ...item,
                isBookmarked: bookmarks.includes(item.id),
                voteCount: voteCounts[item.id] || item.voteCount,
              }))}
              onBookmarkToggle={toggleBookmark}
              onVote={handleVote}
            />
            {!isLoading && hasMore && (
              <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
            )}
          </>
        ) : (
          // Now `setSearchQuery` is defined and passed to `RecentSearches`
          <RecentSearches recentSearches={recentSearches} setSearchQuery={updateSearchQuery} />
        )}
      </ViewCountProvider>
    </motion.div>
  );
};

export default SearchPage;