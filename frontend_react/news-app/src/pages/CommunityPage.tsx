// src/pages/CommunityPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCommunityPosts } from '../services/apiService';
import CommunityPostComponent from '../components/CommunityPost';
import LoadMoreButton from '../components/LoadMoreButton';
import { CommunityPost } from '../types';

const PAGE_SIZE = 10;

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const newPosts = await fetchCommunityPosts(page, PAGE_SIZE);
        console.log('Fetched posts:', newPosts); // Log the fetched posts
        const updatedPosts = [...posts, ...newPosts];
        console.log('Updated posts before setting state:', updatedPosts); // Inspect combined posts
        setPosts(updatedPosts);
        setIsLoading(false);
        setHasMore(newPosts.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch community posts:", error);
        setIsLoading(false);
      }
    };
  
    loadPosts();
  }, [page]);

  const handleWritePost = () => {
    navigate('/community/write');
  };

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1); // Increment page number to fetch next set of posts
  }, []);

  return (
    <div className="flex min-h-screen bg-white pt-18 py-20">
      <div className="container mx-auto px-4">
        <div className="text-right mb-4">
          <button
            onClick={handleWritePost}
            className="fixed bottom-16 right-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            style={{ transition: 'background-color 0.3s' }}
          >
            + 글쓰기
          </button>
        </div>
        {posts.length ? (
          <>
            {posts.map((post) => <CommunityPostComponent key={post.id} post={post} />)}
            {hasMore && <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />}
          </>
        ) : (
          <div className="text-center mt-4">
            <p>No posts yet. Be the first to start a discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
