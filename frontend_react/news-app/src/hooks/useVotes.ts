// src/hooks/useVotes.ts
import { useState, useEffect } from 'react';
import { submitVote } from '../services/apiService';

const useVotes = () => {
  const [voteCounts, setVoteCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const voteCountsString = localStorage.getItem('voteCounts');
    const initialVoteCounts = voteCountsString ? JSON.parse(voteCountsString) : {};
    setVoteCounts(initialVoteCounts);
  }, []);

  const handleVote = async (newsId: number, voteValue: number) => {
    const updatedNewsItem = await submitVote(newsId, voteValue);
    const newVoteCounts = { ...voteCounts, [newsId]: updatedNewsItem.voteCount };
    setVoteCounts(newVoteCounts);
    localStorage.setItem('voteCounts', JSON.stringify(newVoteCounts));
  };

  return { voteCounts, handleVote };
};

export default useVotes;
