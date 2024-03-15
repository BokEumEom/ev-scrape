// src/components/NavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-indigo-500 text-white p-4 flex justify-between items-center z-[9999]">
      <div className="font-bold text-xl">NewsApp</div>
      <ul className="flex">
        <li className="mr-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold underline' : 'text-white'}>Home</NavLink>
        </li>
        <li className="mr-6">
          <NavLink to="/news" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold underline' : 'text-white'}>뉴스</NavLink>
        </li>
        <li className="mr-6">
          <NavLink to="/announcements" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold underline' : 'text-white'}>공고</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;