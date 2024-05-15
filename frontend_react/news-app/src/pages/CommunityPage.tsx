// src/pages/CommunityPage.tsx
import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunityPosts } from '../hooks/useCommunityPosts';
import LoadMoreButton from '../components/LoadMoreButton';
import { motion } from 'framer-motion';

const CommunityPostComponent = lazy(() => import('../components/community/CommunityPost'));

const CommunityPage: React.FC = () => {
  const {
    data = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunityPosts();

  const navigate = useNavigate();
  const handleWritePost = () => navigate('/community/write');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delayChildren: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="flex flex-col"
    >
      <div className="flex bg-white">
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
                <Suspense key={`${post.id}-${index}`} fallback={<div>Loading post...</div>}>
                  <CommunityPostComponent post={post} />
                </Suspense>
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
