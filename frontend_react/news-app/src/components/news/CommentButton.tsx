// src/components/news/CommentButton.tsx
import React from 'react';
import { IoChatbubbleOutline } from 'react-icons/io5';

const CommentButton: React.FC = React.memo(() => (
  <button className="p-1 rounded-full hover:bg-gray-100 ml-1" aria-label="Comment">
    <IoChatbubbleOutline className="text-gray-500 text-lg" size={18} />
  </button>
));

export default CommentButton;
