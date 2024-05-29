// src/hooks/useVotes.ts
import { useState, useEffect } from 'react';
import { submitVote } from '@/services/newsService'; // 뉴스 서비스에서 submitVote 함수를 가져옴

// 투표를 관리하기 위한 커스텀 훅
const useVotes = () => {
  // 뉴스 항목에 대한 투표 수를 저장할 상태
  const [voteCounts, setVoteCounts] = useState<{ [key: number]: number }>({});

  // 컴포넌트가 마운트될 때 localStorage에서 투표 수를 로드하기 위한 effect
  useEffect(() => {
    // localStorage에서 투표 수를 가져오거나, 존재하지 않으면 빈 객체를 사용
    const voteCountsString = localStorage.getItem('voteCounts');
    const initialVoteCounts = voteCountsString ? JSON.parse(voteCountsString) : {};
    setVoteCounts(initialVoteCounts); // 가져온 투표 수를 상태에 설정
  }, []); // 빈 의존성 배열은 이 effect가 마운트 시 한 번만 실행되도록 함

  // 뉴스 항목에 대한 투표를 처리하는 함수
  const handleVote = async (newsId: number, voteValue: number) => {
    try {
      // 투표를 제출하고 API로부터 업데이트된 뉴스 항목을 가져옴
      const updatedNewsItem = await submitVote(newsId, voteValue);
      // 뉴스 항목에 대한 새로운 투표 수로 상태 업데이트
      const newVoteCounts = { ...voteCounts, [newsId]: updatedNewsItem.voteCount };
      setVoteCounts(newVoteCounts); // 새로운 투표 수로 상태 업데이트
      localStorage.setItem('voteCounts', JSON.stringify(newVoteCounts)); // 새로운 투표 수를 localStorage에 저장
    } catch (error) {
      console.error('투표 제출 실패:', error); // 투표 제출이 실패한 경우 에러를 로그에 기록
    }
  };

  // 투표 수와 투표를 처리하는 함수를 반환
  return { voteCounts, handleVote };
};

export default useVotes;
