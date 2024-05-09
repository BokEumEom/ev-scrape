// src/components/CallToActionSection.tsx
import React from 'react';

const CallToActionSection: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white text-center p-16 relative z-10">
      <h2 className="text-3xl font-bold mb-4">Join the EV Revolution</h2>
      <p className="mb-8">Sign up to get the latest news and updates.</p>
      <button className="bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300">
        Sign Up Now
      </button>
    </div>
  );
};

export default CallToActionSection;
