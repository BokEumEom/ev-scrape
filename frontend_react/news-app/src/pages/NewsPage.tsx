// src/pages/NewsPage.tsx
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSpring, animated } from 'react-spring';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';

const NewsPage: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    // react-spring animation setup
    const [style, set] = useSpring(() => ({ opacity: 1, transform: 'translateX(0px)' }));

    // Load news items when the component mounts or page changes
    useEffect(() => {
        fetchNewsItems(page, limit)
            .then(newItems => {
                set({ opacity: 1, transform: 'translateX(0px)', reset: true });
                setNewsItems(newItems);
            })
            .catch(error => console.error("Fetching news items failed:", error));
        // Scroll to the top of the page when the page changes
        window.scrollTo(0, 0);
    }, [page, set]);

    const swipeLeft = () => {
        set({ opacity: 0, transform: 'translateX(-100px)' });
        setTimeout(() => setPage((prevPage) => prevPage + 1), 200);
    };

    const swipeRight = () => {
        set({ opacity: 0, transform: 'translateX(100px)' });
        setTimeout(() => setPage((prevPage) => Math.max(prevPage - 1, 1)), 200);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => swipeLeft(),
        onSwipedRight: () => swipeRight(),
        trackMouse: true
    });

    return (
        <div {...swipeHandlers} className="flex flex-col h-full">
            <animated.div style={style} className="flex-grow">
                <NewsList newsItems={newsItems} />
            </animated.div>
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
