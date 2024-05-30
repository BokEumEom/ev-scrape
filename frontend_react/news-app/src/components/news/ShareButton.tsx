// src/components/news/ShareButton.tsx
import React from 'react';
import { IoShareOutline } from 'react-icons/io5';

interface ShareButtonProps {
  onShare: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = React.memo(({ onShare }) => (
  <button onClick={onShare} className="p-1 rounded-full hover:bg-gray-100 ml-1" aria-label="Share">
    <IoShareOutline className="text-gray-500 text-lg" size={18} />
  </button>
));

export default ShareButton;
