// In src/pages/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { getUserProfile, signOutUser } from '../services/userService';
import Spinner from '../components/Spinner';
import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { HiFire } from "react-icons/hi2";
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { name: '작성한 글', key: 'posts' },
  { name: '댓글단 글', key: 'comments' },
  { name: '저장한 글', key: 'saves' },
];

const MyPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error(error);
        // Handle errors, maybe navigate to a login page if not authenticated
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/login'); // or wherever you'd like to redirect the user to
  };

  if (!user) {
    return <div><Spinner /></div>; // or any loading indicator
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <div>Posts content...</div>;
      case 'comments':
        return <div>Comments content...</div>;
      case 'saves':
        return <div>Saves content...</div>;
      default:
        return null;
    }
  };

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
    <div className="container mx-auto px-4 py-20">
      <div className="bg-white shadow rounded-lg p-2 mb-4">
        <div className="flex flex-col items-center">
          <img src={user.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full" />
          <h2 className="mt-4 font-bold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.joinDate}</p>
          {/* More user details can be added here */}
        </div>

        <div className="flex justify-around my-4 text-center">
          <div>
            <span className="block font-bold">{user.postsCount}</span>
            <span className="text-gray-600">조회수</span>
          </div>
          <div>
            <span className="block font-bold">{user.followersCount}</span>
            <span className="text-gray-600">작성글/댓글</span>
          </div>
          <div>
            <span className="block font-bold">{user.followingCount}</span>
            <span className="text-gray-600">받은 공감</span>
          </div>
        </div>

        <div className="flex justify-around my-4">
          {/* Example: Some achievement badges here */}
          {/* ... */}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSignOut}
            className="text-white bg-gray-500 hover:bg-red-700 font-medium rounded-lg text-sm w-full py-2.5 text-center"
          >
            프로필 등록
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-2 mb-4 ">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 justify-around">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 text-sm font-medium text-center ${
                  activeTab === tab.key
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {tab.name}
                {activeTab === tab.key && (
                  <motion.div
                    className="border-b-2 border-blue-500"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>

        <div className="text-center py-8">
          <span className="text-lg font-medium">전기차 오너 이야기를 이곳에서 들려주세요.</span>
          <button
            onClick={handleSignOut} // Update this onClick event to handle the actual action you want
            className="w-full bg-blue-500 text-white rounded-lg mt-4 py-2 px-4 hover:bg-blue-600"
          >
            전기차 생활 글쓰기
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <div className="flex justify-around my-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="block font-bold">{user.postsCount}</span>
              <span className="text-gray-600 py-2">글쓰기</span>
              <FaPencilAlt className="text-gray-700 text-2xl mb-2" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="block font-bold">{user.followersCount}</span>
              <span className="text-gray-600 py-2">댓글쓰기</span>
              <IoChatbubbleEllipses className="text-gray-700 text-2xl mb-2" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="block font-bold">{user.followingCount}</span>
              <span className="text-gray-600 py-2">인기글 조회</span>
              <HiFire className="text-gray-700 text-2xl mb-2" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="block font-bold">{user.followingCount}</span>
              <span className="text-gray-600 py-2">공감 보내기</span>
              <IoHeartSharp className="text-gray-700 text-2xl mb-2" />
            </div>
          </div>
      </div>
    </div>
    </motion.div>
  );
};

export default MyPage;
