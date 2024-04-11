// UserProfile.tsx
import React from 'react';

interface UserProfileProps {
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

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onProfileButtonClick,
  onWritePostClick,
}) => (
  <div className="bg-white p-2">
    <div className="flex flex-col items-center">
      <img src={user.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full" />
      <h2 className="mt-4 font-bold text-lg">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.joinDate}</p>
    </div>

    <div className="flex justify-around my-4 text-center">
      <div>
        <span className="text-xs text-gray-500">조회수</span>
        <span className="block font-bold text-gray-400">0{user.postsCount}</span>
      </div>
      <div>
        <span className="text-xs text-gray-500">작성글/댓글</span>
        <span className="block font-bold text-gray-400">0{user.followersCount}</span>
      </div>
      <div>
        <span className="text-xs text-gray-500">받은 공감</span>
        <span className="block font-bold text-gray-400">0{user.followingCount}</span>
      </div>
      <div>
        <span className="text-xs text-gray-500">북마크</span>
        <span className="block font-bold text-gray-400">0{user.followingCount}</span>
      </div>
    </div>

    <div className="text-center mt-4">
      <button
        onClick={onProfileButtonClick}
        className="text-gray-800 bg-gray-200 hover:bg-red-700 font-semibold rounded-lg text-xs w-full py-2.5 text-center"
      >
        프로필 등록
      </button>
    </div>
  </div>
);

export default UserProfile;