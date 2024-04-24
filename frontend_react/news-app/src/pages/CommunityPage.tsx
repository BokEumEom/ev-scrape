// src/pages/CommunityPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunityPosts } from '../hooks/useCommunityPosts';
import CommunityPostComponent from '../components/CommunityPost';
import LoadMoreButton from '../components/LoadMoreButton';
import { motion } from 'framer-motion';

const CommunityPage: React.FC = () => {
  const {
    data = { pages: [] }, // data에 기본값을 할당하여 초기 상태에서 undefined가 되지 않도록 함
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunityPosts();

  const navigate = useNavigate();

  const handleWritePost = () => navigate('/community/write');

  // data와 data.pages의 존재 여부를 확인하지 않고 직접 접근
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delayChildren: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="flex flex-col min-h-screen pb-18"
    >
      <div className="flex min-h-screen bg-white py-12">
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
          {data.pages.flat().length ? (
            <>
              {data.pages.flatMap(page => page.data).map((post, index) => (
                <CommunityPostComponent key={`${post.id}-${index}`} post={post} />
              ))}
              {hasNextPage && <LoadMoreButton isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} />}
            </>
          ) : (
            <div className="text-center mt-4">
              <p>No posts yet. Be the first to start a discussion!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPage;
