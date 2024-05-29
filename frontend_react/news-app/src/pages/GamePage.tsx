// src/pages/GamePage.tsx
import React, { useState, useCallback } from 'react';
import Header from '@/components/games/Header';
import GameArea from '@/components/games/GameArea';
import GameOverModal from '@/components/games/GameOverModal';

// GamePage 컴포넌트 정의
const GamePage: React.FC = () => {
  // 점수를 관리하는 상태
  const [score, setScore] = useState(0);
  // 게임이 활성화되었는지를 나타내는 상태
  const [gameActive, setGameActive] = useState(false);
  // 게임 오버 모달의 표시 여부를 관리하는 상태
  const [showModal, setShowModal] = useState(false);

  // 게임 시작 함수, 게임 모드를 매개변수로 받아 초기화
  const startGame = useCallback((mode: 'easy' | 'medium' | 'hard') => {
    setScore(0); // 게임 시작 시 점수를 초기화
    setGameActive(true);
    setShowModal(false);
  }, []);

  // 게임 오버 함수, 게임을 종료하고 모달을 표시
  const gameOver = useCallback(() => {
    setGameActive(false);
    setShowModal(true);
  }, []);

  // 게임 오버 모달 닫기 함수, 모달을 닫고 점수를 초기화
  const closeGameOverModal = useCallback(() => {
    setShowModal(false);
    setScore(0); // 게임 오버 모달을 닫을 때 점수를 초기화
  }, []);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-800 text-white">
      {/* 헤더 컴포넌트, 점수와 게임 시작 함수를 전달 */}
      <Header score={score} onStartGame={startGame} />
      <div className="flex-grow flex items-center justify-center">
        {/* 게임이 활성화되었을 때만 GameArea 컴포넌트를 표시 */}
        {gameActive && <GameArea gameOver={gameOver} setScore={setScore} />}
      </div>
      {/* 게임 오버 모달이 표시될 때만 GameOverModal 컴포넌트를 표시 */}
      {showModal && <GameOverModal score={score} onClose={closeGameOverModal} />}
    </div>
  );
};

export default GamePage;
