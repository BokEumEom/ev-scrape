// src/pages/MyPage.tsx
import React, { useState } from 'react';
import useUserProfile from '../hooks/useUserProfile';
import Spinner from '../components/Spinner';
import UserProfileForm from '../components/UserProfileForm';
import ProfileHeader from '../components/ProfileHeader';
import UserStats from '../components/UserStats';
import UserActivities from '../components/UserActivities';
import TabNavigation from '../components/TabNavigation';
import ActivityContent from '../components/ActivityContent';
import { motion } from 'framer-motion';
import { tabs, pageTransitionEffects } from '../constants/constants';

const MyPage = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { user, isLoading, error, handleSignOut } = useUserProfile();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  const handleProfileFormToggle = () => setShowProfileForm(!showProfileForm);

  return (
    <motion.div {...pageTransitionEffects} className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        {showProfileForm ? (
          <UserProfileForm user={user} onClose={handleProfileFormToggle} />
        ) : (
          <>
            <ProfileHeader user={user} onEditProfile={handleProfileFormToggle} onSignOut={handleSignOut} />
            <UserStats user={user} />
            <UserActivities user={user} />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <ActivityContent activeTab={activeTab} />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MyPage;

