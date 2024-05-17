// src/components/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ to, icon, title, description }) => {
  return (
    <Link to={to} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
      <div className="text-2xl">{icon}</div>
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      {description && <p className="text-gray-600 text-center">{description}</p>}
    </Link>
  );
};

export default Card;
