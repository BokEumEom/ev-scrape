// src/pages/NewsPage.tsx
import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types'; // Adjust if necessary
import { fetchNewsItems } from '../services/apiService';
import NewsList from '../components/NewsList';

const NewsPage: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [page, setPage] = useState(1);
    const limit = 10; // Adjust based on your preference or backend setup

    useEffect(() => {
        fetchNewsItems(page, limit)
            .then(setNewsItems)
            .catch(error => console.error("Fetching news items failed:", error));
        
        // Scroll to the top of the page when the page changes
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="px-4">
            <NewsList newsItems={newsItems} />
            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 md:px-4 rounded-lg shadow mx-2 disabled:opacity-50" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 md:px-4 rounded-lg shadow mx-2" onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default NewsPage;

