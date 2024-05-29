// src/components/mypage/UserProfileSection.tsx
import React from 'react';
import UserProfile from './UserProfile';
import UserStats from './UserStats';

interface UserProfileSectionProps {
  user: {
    avatarUrl: string;
    name: string;
    joinDate: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
  };
  onProfileButtonClick: () => void;
  onWritePostClick: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onProfileButtonClick,
  onWritePostClick,
}) => {
  return (
    <>
      <UserProfile
        user={user}
        onProfileButtonClick={onProfileButtonClick}
        onWritePostClick={onWritePostClick}
      />
      <UserStats
        postsCount={user.postsCount}
        followersCount={user.followersCount}
        followingCount={user.followingCount}
      />
    </>
  );
};

export default UserProfileSection;
