// src/pages/NewsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import { IoIosArrowUp } from 'react-icons/io';

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchNewsItems(page, limit)
      .then(data => {
        setNewsItems(prevItems => {
          // Filter out any items already in the state (to prevent duplicates)
          const newItems = data.filter(newItem => !prevItems.some(item => item.id === newItem.id));
          return [...prevItems, ...newItems];
        });
      })
      .catch(error => {
        setError("Failed to fetch news items.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Correctly conditionally render the "More" button and loading spinner
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

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-20">
      <NewsList newsItems={newsItems} />

      <div className="mt-4 px-4 flex justify-center">
        {loadMoreButton}
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-16 right-5 text-white text-2xl p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg opacity-75"
        aria-label="Scroll to top"
      >
        <IoIosArrowUp />
      </button>
    </div>
  );
};

export default NewsPage;
