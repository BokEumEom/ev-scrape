// src/components/NavigationBar.tsx
import React, { useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { Divide as Hamburger } from 'hamburger-react';
import DropdownMenu from './DropdownMenu';

const NavigationBar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-gray-800 p-1 flex justify-between items-center z-10">
      <div className="flex items-center">
        <span className="font-bold text-xl p-2 mr-3 h-[3rem]">EVTrend</span>
      </div>
      <ul className="flex items-center">
        <li className="mr-4">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-gray-700' : 'text-white'} title="Search">
            <IoSearch className="text-gray-700 text-2xl" aria-label="Search" />
          </NavLink>
        </li>
        <li className="relative">
          <Hamburger toggled={isOpen} toggle={setIsOpen} color="#4B5563" size={24} aria-label="Toggle Menu" />
          <DropdownMenu isOpen={isOpen} />
        </li>
      </ul>
    </nav>
  );
});

export default NavigationBar;