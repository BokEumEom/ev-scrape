import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { NewsItem } from '../types';
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';

const NewsPage: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        fetchNewsItems(page, limit)
            .then(setNewsItems)
            .catch(error => console.error("Fetching news items failed:", error));
        
        // Scroll to the top of the page when the page changes
        window.scrollTo(0, 0);
    }, [page]);

    const handlers = useSwipeable({
        onSwipedLeft: () => setPage(page + 1), // 오른쪽에서 왼쪽으로 스와이프 시 다음 페이지
        onSwipedRight: () => setPage(page > 1 ? page - 1 : 1), // 왼쪽에서 오른쪽으로 스와이프 시 이전 페이지
        trackMouse: true, // 마우스로도 스와이프 가능
    });

    return (
        <div {...handlers}>
            <NewsList newsItems={newsItems} />
            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow mx-2 disabled:opacity-50" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow mx-2" onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default NewsPage;
