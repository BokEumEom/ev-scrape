// src/pages/CommunityPage.tsx
import { motion } from 'framer-motion'; // 애니메이션 효과를 위한 라이브러리
import React, { lazy, Suspense, useEffect, useState } from 'react'; // React 및 관련 훅들
import { useNavigate } from 'react-router-dom'; // 라우팅을 위한 훅
import LoadMoreButton from '@/components/LoadMoreButton'; // 더 불러오기 버튼 컴포넌트
import CommunityPostSkeleton from '@/components/community/CommunityPostSkeleton'; // 로딩 스켈레톤 컴포넌트
import { useCommunityPosts } from '@/hooks/useCommunityPosts'; // 커스텀 훅을 사용하여 커뮤니티 게시글 데이터 가져오기

// CommunityPostComponent를 동적으로 가져와 초기 로드 시간을 줄임
const CommunityPostComponent = lazy(() => import('@/components/community/CommunityPost'));

// CommunityPage 컴포넌트 정의
const CommunityPage: React.FC = () => {
  // 커뮤니티 게시글 데이터를 가져오기 위한 커스텀 훅 사용
  const {
    data = { pages: [] },   // 페이지네이션된 데이터
    fetchNextPage,          // 다음 페이지 데이터를 가져오는 함수
    hasNextPage,            // 다음 페이지가 있는지 여부를 나타내는 부울 값
    isFetchingNextPage,     // 다음 페이지를 가져오는 중인지 여부를 나타내는 부울 값
    error,                  // 에러 객체
  } = useCommunityPosts();

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const handleWritePost = () => navigate('/community/write'); // 글쓰기 페이지로 이동하는 함수

  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 데이터가 로드되면 로딩 상태를 false로 설정
  useEffect(() => {
    if (data.pages.length) {
      setLoading(false);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }} // 초기 투명도
      animate={{ opacity: 1, transition: { duration: 0.5, delayChildren: 0.3 } }} // 애니메이션 효과
      exit={{ opacity: 0, transition: { duration: 0.5 } }} // 종료 시 애니메이션 효과
      className="flex flex-col"
    >
      <div className="flex bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-right mb-4">
            <button
              onClick={handleWritePost} // 글쓰기 페이지로 이동
              className="fixed bottom-16 right-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50"
              style={{ transition: 'background-color 0.3s' }}
              aria-label="Write a new post"
            >
              + 글쓰기
            </button>
          </div>
          {error ? (
            // 에러가 발생한 경우 에러 메시지 표시
            <div className="text-center mt-4 text-red-500">
              <p>Error loading posts: {error.message}</p>
            </div>
          ) : loading ? (
            // 로딩 중일 때 스켈레톤 로더 표시
            <div>
              {Array(5).fill(0).map((_, index) => (
                <CommunityPostSkeleton key={index} />
              ))}
            </div>
          ) : data.pages.flat().length ? (
            // 게시글이 있는 경우 게시글 목록 표시
            <>
              {data.pages.flatMap(page => page.data).map((post, index) => (
                <Suspense key={`${post.id}-${index}`} fallback={<CommunityPostSkeleton />}>
                  <CommunityPostComponent post={post} />
                </Suspense>
              ))}
              {hasNextPage && <LoadMoreButton isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} />}
            </>
          ) : (
            // 게시글이 없는 경우 메시지 표시
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
