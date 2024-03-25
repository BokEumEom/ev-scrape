// src/pages/NewsPage.tsx
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import { IoIosArrowUp } from 'react-icons/io';
import useBookmarks from '../hooks/useBookmarks';
import useVotes from '../hooks/useVotes';

interface ViewCounts {
  [key: number]: number;
}

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { voteCounts, handleVote } = useVotes();
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});

  // Fetch news items whenever the page number changes or component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const fetchedItems = await fetchNewsItems(page);
        // Create a new array combining the old and new items.
        const combinedItems = [...newsItems, ...fetchedItems];
        // Use a Map to filter out duplicate items based on their unique ID.
        const uniqueItemsMap = new Map(combinedItems.map(item => [item.id, item]));
        // Convert the Map back into an array.
        const uniqueItems = Array.from(uniqueItemsMap.values());
        setNewsItems(uniqueItems);
      } catch (error) {
        console.error('Error fetching news items:', error);
        setError('Failed to load news items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchItems();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ensure this useEffect hook is used to load the viewCounts once when the component mounts
  useEffect(() => {
    const loadViewCounts = () => {
      // Safely parse the JSON with a fallback for undefined values
      const loadedViewCounts = JSON.parse(localStorage.getItem('viewCounts') || '{}');
      setViewCounts(loadedViewCounts);
    };
  
    loadViewCounts();
  }, []);
  

  const incrementViewCount = (newsItemId: number) => {
    setViewCounts(prevViewCounts => {
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
    <div className="flex flex-col min-h-screen pt-16 py-20">
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
      <div className="mt-4 px-4 flex justify-center">
        {isLoading ? <Spinner /> : <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">More</button>}
      </div>
      <button onClick={scrollToTop} className="fixed bottom-16 right-5 text-white text-2xl p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg opacity-75" aria-label="Scroll to top">
        <IoIosArrowUp />
      </button>
    </div>
  );
};

export default NewsPage;
