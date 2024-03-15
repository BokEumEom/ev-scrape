// src/pages/NewsPage.tsx

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTransition, animated } from '@react-spring/web';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error state on attempt to fetch new page
    fetchNewsItems(page, limit)
      .then(data => {
        setNewsItems(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fetching news items failed:", error);
        setError("Failed to fetch news items."); // Set error state
        setIsLoading(false);
      });
  }, [page]);

  const transitions = useTransition(newsItems, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const swipeLeft = () => setPage((currentPage) => currentPage + 1);
  const swipeRight = () => setPage((currentPage) => Math.max(currentPage - 1, 1));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: swipeLeft,
    onSwipedRight: swipeRight,
    trackMouse: true // Consider environmental conditioning for development vs. production
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div {...swipeHandlers} className="flex flex-col h-full pt-16 pb-20"> {/* 패딩 추가 */}
      {transitions((style, item) => (
        <animated.div key={item.id} style={style}>
          <NewsList newsItems={[item]} />
        </animated.div>
      ))}
      <div className="mt-4 px-4 flex justify-between sm:justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-full sm:max-w-xs transition duration-300 ease-in-out"
            onClick={swipeRight}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-full sm:max-w-xs transition duration-300 ease-in-out"
            onClick={swipeLeft}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default NewsPage;
