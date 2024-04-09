// src/components/ProfileHeader.tsx
import React from 'react';

const ProfileHeader = ({ user, onEditProfile, onSignOut }) => {
  return (
    <div className="bg-white p-4 text-center">
      <img src={user.avatarUrl} alt={`${user.name}의 프로필 사진`} className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="mt-4 font-bold text-lg">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.joinDate}</p>
      <button onClick={onEditProfile} className="text-blue-600 text-sm mt-2">
        프로필 편집
      </button>
      <button onClick={onSignOut} className="text-red-600 text-sm mt-2">
        로그아웃
      </button>
    </div>
  );
};

export default ProfileHeader;
