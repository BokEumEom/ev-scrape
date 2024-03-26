// src/pages/SearchPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NewsItem } from '../types';
import SearchBar from '../components/SearchBar';
import { searchNewsItems, submitVote } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';
import { ViewCountProvider } from '../contexts/ViewCountContext';
import LoadMoreButton from '../components/LoadMoreButton';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // Initially false until search is performed
  const [isLoading, setIsLoading] = useState(false);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  const query = searchParams.get('query') || '';

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

  return (
    <ViewCountProvider>
      <div className="flex flex-col min-h-screen pt-16 pb-20"> {/* Padding for header and search bar */}
        <SearchBar />
        <NewsList
          newsItems={newsItems.map(item => ({
            ...item,
            isBookmarked: bookmarks.includes(item.id),
            voteCount: voteCounts[item.id] || item.voteCount,
          }))}
          onBookmarkToggle={toggleBookmark}
          onVote={handleVote}
        />
        {isLoading && <div className="text-center"><Spinner /></div>}
        {!isLoading && hasMore && (
          <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
        )}
      </div>
    </ViewCountProvider>
  );
};

export default SearchPage;