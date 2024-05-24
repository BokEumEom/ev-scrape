// src/components/games/Header.tsx
import React from 'react';

interface HeaderProps {
  score: number;
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const Header: React.FC<HeaderProps> = ({ score, onStartGame }) => {
  return (
    <div className="flex justify-between items-center p-12 bg-gray-800">
      <div className="text-lg">SCORE: {score}</div>
      <div className="flex space-x-1">
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => onStartGame('easy')}>Easy</button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => onStartGame('medium')}>Medium</button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => onStartGame('hard')}>Hard</button>
      </div>
    </div>
  );
};

export default Header;
