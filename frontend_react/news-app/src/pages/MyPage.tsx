// In src/pages/MyPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import UserProfile from '../components/UserProfile';
import UserStats from '../components/UserStats';
import TabNavigation from '../components/TabNavigation';
import TabContent from '../components/TabContent';
import useUserProfile from '../hooks/useUserProfile';
import { motion } from 'framer-motion';

const tabs = [
  { name: '작성한 글', key: 'posts', content: <div>Posts content...</div> },
  { name: '댓글단 글', key: 'comments', content: <div>Comments content...</div> },
  { name: '저장한 글', key: 'saves', content: <div>Saves content...</div> },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  // Fetch user profile with React Query (updated to match v5 requirements)
  const { user, isLoading, error, handleSignOut } = useUserProfile();

  const handleWritePost = () => navigate('/community/write');

  const handleProfileButtonClick = () => {
    navigate('/userprofileform'); // ProfileForm으로 라우팅
  };

  if (isLoading) return <Spinner />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // Page load transition effect
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="flex flex-col min-h-screen pt-16 pb-20"
      >
    <div className="container mx-auto px-0 bg-gray-100">
      <UserProfile
            user={{
              avatarUrl: user.avatarUrl,
              name: user.name,
              joinDate: user.joinDate,
            }}
            onProfileButtonClick={handleProfileButtonClick}
            onWritePostClick={handleWritePost}
          />
      <UserStats
        postsCount={user.postsCount}
        followersCount={user.followersCount}
        followingCount={user.followingCount}
      />
      <div className="bg-white mb-0 flex flex-col justify-between h-full">
        <div className="border-b border-gray-200 mb-12">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <TabContent activeTab={activeTab} tabs={tabs} />

        <div className="text-center p-2 py-16 mt-auto">
          <span className="text-gray-500 text-sm font-medium block mb-6">전기차 오너 이야기를 이곳에서 들려주세요.</span>
          <button
            onClick={handleWritePost} // Update this onClick event to handle the actual action you want
            className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
          >
            커뮤니티 글쓰기
          </button>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default MyPage;
