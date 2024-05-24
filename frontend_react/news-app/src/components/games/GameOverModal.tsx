// src/components/games/GameOverModal.tsx
import React from 'react';

interface GameOverModalProps {
  score: number;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Game Over!</h2>
        <p className="mb-4 text-lg text-orange-500">Your final score is: <span className="text-orange-500 font-bold">{score}</span></p>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={onClose}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;

