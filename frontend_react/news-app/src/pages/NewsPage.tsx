// src/pages/NewsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTransition, animated } from '@react-spring/web';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';
import '../styles/styles.module.css'; // Assume styles are defined similarly

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch news items when the component mounts or page changes
  useEffect(() => {
    fetchNewsItems(page, limit)
      .then(data => {
        setNewsItems(data);
      })
      .catch(error => console.error("Fetching news items failed:", error));
  }, [page]);

  const transitions = useTransition(newsItems, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const swipeLeft = () => setPage((currentPage) => currentPage + 1);
  const swipeRight = () => setPage((currentPage) => Math.max(currentPage - 1, 1));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => swipeLeft(),
    onSwipedRight: () => swipeRight(),
    trackMouse: true // This enables mouse swipes for development, consider removing for production
  });

  return (
    <div {...swipeHandlers} className="flex flex-col h-full">
      {transitions((style, item, transition, index) => (
        <animated.div key={index} style={style}>
          <NewsList newsItems={[item]} /> {/* Adapt NewsList to handle single items or adjust this mapping */}
        </animated.div>
      ))}
      <div className="flex justify-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={swipeRight}
                disabled={page === 1}>
          Previous
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={swipeLeft}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsPage;

