// src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NewsItem } from '../types';
import SearchBar from '../components/SearchBar';
import { searchNewsItems, submitVote } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';

interface ViewCounts {
  [key: number]: number;
}

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // Initially false until search is performed
  const [isLoading, setIsLoading] = useState(false);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();

  const query = searchParams.get('query') || '';

  const [viewCounts, setViewCounts] = useState<ViewCounts>({});

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Make sure to reset the list of news items if the query changes
      if (page === 1) setNewsItems([]);
      searchNewsItems(query, page)
        .then(newItems => {
          setNewsItems(currentItems => [...currentItems, ...newItems]);
          setHasMore(newItems.length === 10); // Assume that if we get fewer than 10, there are no more results
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching search results:', err);
          setIsLoading(false);
        });
    }
  }, [query, page]);
  

  const handleLoadMore = () => {
    setPage(currentPage => currentPage + 1);
  };

  const loadMoreButton = isLoading ? (
    <div className="flex justify-center items-center my-10">
      <Spinner />
    </div>
  ) : (
    <button
      onClick={handleLoadMore}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      More
    </button>
  );

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
        incrementViewCount={incrementViewCount}
        viewCounts={viewCounts}
      />
      {isLoading && <div className="text-center">Loading more items...</div>}
      {!isLoading && hasMore && (
        <div className="mt-4 px-4 flex justify-center">
            {loadMoreButton}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
