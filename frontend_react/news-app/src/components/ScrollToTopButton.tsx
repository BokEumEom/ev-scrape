// src/components/ScrollToTopButton.tsx
import React, { useCallback } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-5 text-white text-2xl p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg opacity-75"
      aria-label="Scroll to top"
    >
      <IoIosArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
