// src/pages/CommunityPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCommunityPosts } from '../services/apiService';
import CommunityPostComponent from '../components/CommunityPost';
import { CommunityPost } from '../types';

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchCommunityPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch community posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleWritePost = () => {
    navigate('/community/write'); // Navigate to the post writing page
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-end pt-4">
          <button
            onClick={handleWritePost}
            className="fixed bottom-16 right-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            style={{ transition: 'background-color 0.3s' }}
          >
            + 글쓰기
          </button>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => <CommunityPostComponent key={post.id} post={post} />)
        ) : (
          <div className="text-center my-4">
            <p>No posts yet. Be the first to start a discussion!</p>
            <button
              onClick={handleWritePost}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Write a Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
