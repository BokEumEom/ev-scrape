// src/pages/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '@/components/mypage/TabNavigation';
import TabContent from '@/components/mypage/TabContent';
import UserProfileSection from '@/components/mypage/UserProfileSection';
import UserActions from '@/components/mypage/UserActions';
import UserProfileSkeleton from '@/components/mypage/UserProfileSkeleton';
import { useUserProfileQuery, useHandleSignOut } from '@/hooks/useUserProfileQuery';

const tabs = [
  { name: '작성한 글', key: 'posts', content: <div>Posts content...</div> },
  { name: '댓글단 글', key: 'comments', content: <div>Comments content...</div> },
  { name: '저장한 글', key: 'saves', content: <div>Saves content...</div> },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { data: user, isLoading, error } = useUserProfileQuery();
  const handleSignOut = useHandleSignOut();

  // 에러 발생 시 인증 상태를 체크
  useEffect(() => {
    if (error) {
      if (error?.response?.status === 401 || error?.message === 'No access token available') {
        localStorage.removeItem('accessToken'); // Clear any invalid token
        navigate('/signin');
      }
    }
  }, [error, navigate]);

  // 글쓰기 페이지로 이동
  const handleWritePost = () => navigate('/community/write');
  // 프로필 수정 페이지로 이동
  const handleProfileButtonClick = () => navigate('/userprofileform');

  if (isLoading) {
    return (
      <div className="container mx-auto px-0 bg-gray-100">
        <UserProfileSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-2 py-16 mt-auto">
        <p className="text-gray-500 text-sm font-medium mb-6">Error: {error.message}</p>
        <button
          onClick={() => navigate('/signin')}
          className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
        >
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 bg-gray-100">
      {user ? (
        <>
          <UserProfileSection
            user={{
              avatarUrl: user.avatarUrl,
              name: user.name,
              joinDate: user.joinDate,
              postsCount: user.postsCount,
              followersCount: user.followersCount,
              followingCount: user.followingCount,
            }}
            onProfileButtonClick={handleProfileButtonClick}
            onWritePostClick={handleWritePost}
          />
          <div className="bg-white mb-0 flex flex-col justify-between h-full">
            <div className="border-b border-gray-200 mb-12">
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <TabContent activeTab={activeTab} tabs={tabs} />
            <UserActions
              onWritePostClick={handleWritePost}
              onSignOutClick={() => {
                handleSignOut();
                navigate('/signin');
              }}
              isLoading={isLoading}
            />
          </div>
        </>
      ) : (
        <div className="text-center p-2 py-16 mt-auto">
          <p className="text-gray-500 text-sm font-medium mb-6">로그인이 필요합니다.</p>
          <button
            onClick={() => navigate('/signin')}
            className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
          >
            로그인 페이지로 이동
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPage;
