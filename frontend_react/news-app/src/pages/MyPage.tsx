// src/pages/MyPage.tsx
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '@/components/mypage/TabNavigation';
import TabContent from '@/components/mypage/TabContent';
import UserProfileSection from '@/components/mypage/UserProfileSection';
import UserActions from '@/components/mypage/UserActions';
import UserProfileSkeleton from '@/components/mypage/UserProfileSkeleton';
import { useUserProfile, useTabs } from '@/hooks/useUserProfileHooks';
import ErrorState from '@/components/mypage/ErrorState';

// 탭 상수를 컴포넌트 파일 내에 정의
interface Tab {
  name: string;
  key: string;
  content: JSX.Element;
}

const tabs: Tab[] = [
  { name: '작성한 글', key: 'posts', content: <div>Posts content...</div> },
  { name: '댓글단 글', key: 'comments', content: <div>Comments content...</div> },
  { name: '저장한 글', key: 'saves', content: <div>Saves content...</div> },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, error, handleSignOut } = useUserProfile();
  const { activeTab, setActiveTab } = useTabs(tabs);

  // navigate 함수를 useCallback으로 감싸서 의존성 배열에 추가
  const handleRetry = useCallback(() => navigate('/signin'), [navigate]);
  const handleProfileButtonClick = useCallback(() => navigate('/userprofileform'), [navigate]);
  const handleWritePostClick = useCallback(() => navigate('/community/write'), [navigate]);
  const handleSignOutClick = useCallback(() => {
    handleSignOut();
    navigate('/signin');
  }, [handleSignOut, navigate]);

  // 로딩 상태일 때 스켈레톤 UI를 보여줌
  if (isLoading) {
    return (
      <div className="container mx-auto px-0 bg-gray-100">
        <UserProfileSkeleton />
      </div>
    );
  }

  // 에러가 발생한 경우 에러 상태 UI를 보여줌
  if (error) {
    return <ErrorState errorMessage={error.message} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-0 bg-gray-100">
      {user ? (
        <>
          {/* 사용자 프로필 섹션 */}
          <UserProfileSection
            user={user}
            onProfileButtonClick={handleProfileButtonClick}
            onWritePostClick={handleWritePostClick}
          />
          <div className="bg-white mb-0 flex flex-col justify-between h-full">
            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200 mb-12">
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            {/* 탭 콘텐츠 */}
            <TabContent activeTab={activeTab} tabs={tabs} />
            {/* 사용자 액션 */}
            <UserActions
              onWritePostClick={handleWritePostClick}
              onSignOutClick={handleSignOutClick}
              isLoading={isLoading}
            />
          </div>
        </>
      ) : (
        <div className="text-center p-2 py-16 mt-auto">
          <p className="text-gray-500 text-sm font-medium mb-6">로그인이 필요합니다.</p>
          <button
            onClick={handleRetry}
            className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
          >
            로그인 페이지로 이동
          </button>
        </div>
      )}
    </div>
  );
};

// React.memo를 사용하여 불필요한 리렌더링 방지
export default React.memo(MyPage);
