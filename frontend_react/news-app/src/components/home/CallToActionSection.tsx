// src/components/CallToActionSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => navigate('/signup');
  const handleSignInClick = () => navigate('/signin');

  return (
    <div className="bg-blue-600 text-white text-center p-16 relative z-10">
      <h2 className="text-3xl font-bold mb-4">Join the EV Revolution</h2>
      <p className="mb-8">Sign up to get the latest news and updates or sign in to your account.</p>
      <div className="space-x-4">
        <button 
          onClick={handleSignInClick}
          className="bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Sign In
        </button>
        <button 
          onClick={handleSignUpClick}
          className="bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Sign Up Now
        </button>
      </div>  
    </div>
  );
};

export default CallToActionSection;
