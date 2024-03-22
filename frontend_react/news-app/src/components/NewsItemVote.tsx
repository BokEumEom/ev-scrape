// src/components/NewsItemVote.tsx
import React from 'react';
import { NewsItemVoteProps } from '../types';
import { motion } from 'framer-motion';
import { IoHeartOutline } from 'react-icons/io5';

const buttonVariants = {
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.8,
  },
};

const NewsItemVote: React.FC<NewsItemVoteProps> = ({ newsId, onVote, voteCount }) => {
  return (
    <div className="flex space-x-2 items-center">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onVote(newsId, 1)}
        className="vote-button upvote"
      >
        <IoHeartOutline />
      </motion.button>
      <span>{voteCount}</span> {/* Display the vote count here */}
    </div>
  );
};

export default NewsItemVote;
