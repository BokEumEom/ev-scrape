// src/components/NavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import logoIcon from '../assets/ev_logo.png';
import { IoSearch, IoPeopleSharp } from "react-icons/io5";

const NavigationBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-indigo-500 text-white p-1 flex justify-between items-center z-10">
      <div className="flex items-center">
        <img src={logoIcon} alt="EV TREND LOGO" className="mr-3 h-[3rem]"/>
        <span className="font-bold text-xl hidden sm:block">EVTrend</span>
      </div>
      <ul className="flex">
        <li className="mr-4">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-gray-700' : 'text-white'}>
            <IoSearch className="text-2xl" aria-label="검색"/>
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to="/community" className={({ isActive }) => isActive ? 'text-gray-700' : 'text-white'}>
            <IoPeopleSharp className="text-2xl" aria-label="채팅"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;