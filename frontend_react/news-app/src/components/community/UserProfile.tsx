// src/components/community/UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  avatarUrl: string;
  name: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, avatarUrl }) => {
  return (
    <div className="flex items-center mb-4">
      <img
        src={avatarUrl}
        alt="profile"
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-4">
        <div className="flex items-center">
          <span className="font-bold text-sm">{name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
