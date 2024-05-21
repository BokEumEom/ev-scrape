// src/pages/GamePage.tsx
import React, { useState, useCallback } from 'react';
import Header from '@/components/games/Header';
import GameArea from '@/components/games/GameArea';
import GameOverModal from '@/components/games/GameOverModal';

const GamePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const startGame = (level: number) => {
    setScore(0); // Reset score at the start of each game
    setGameActive(true);
    setShowModal(false);
  };

  const gameOver = useCallback(() => {
    setGameActive(false);
    setShowModal(true);
  }, []);

  const closeGameOverModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-800 text-white">
      <Header score={score} onStartGame={startGame} />
      <div className="flex-grow flex items-center justify-center">
        {gameActive && <GameArea gameOver={gameOver} setScore={setScore} />}
      </div>
      {showModal && <GameOverModal score={score} onClose={closeGameOverModal} />}
    </div>
  );
};

export default GamePage;
