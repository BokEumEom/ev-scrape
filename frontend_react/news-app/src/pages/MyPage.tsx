// In src/pages/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { getUserProfile, signOutUser } from '../services/userService';

const MyPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserProfile();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/login'); // or wherever you'd like to redirect the user to
  };

  if (!user) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div className="container mx-auto p-4 py-16 pt-20">
      <div className="flex flex-col items-center mb-8">
        <img src={user.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full" />
        <h1 className="text-xl font-bold my-2">{user.name}</h1>
        <p>{user.email}</p>
      </div>

      {/* Add more sections as needed */}

      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MyPage;
