// src/components/NavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import logoIcon from '../assets/ev_logo.png';
import { IoFlash, IoNewspaperSharp, IoTodaySharp } from "react-icons/io5";

const NavigationBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-indigo-500 text-white p-1 flex justify-between items-center z-10">
      <div className="flex items-center">
        <img src={logoIcon} alt="EV TREND LOGO" className="mr-3 h-[4rem]"/>
        <span className="font-bold text-xl hidden sm:block">EVTrend</span>
      </div>
      <ul className="flex">
        <li className="flex items-center mr-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold' : 'text-white'}>Home</NavLink>
          <IoFlash className="ml-1"/>
        </li>
        <li className="flex items-center mr-6">
          <NavLink to="/news" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold' : 'text-white'}>
            뉴스
          </NavLink>
          <IoNewspaperSharp className="ml-1"/>
        </li>
        <li className="flex items-center mr-6">
          <NavLink to="/announcements" className={({ isActive }) => isActive ? 'text-yellow-500 font-semibold' : 'text-white'}>
            공고
          </NavLink>
          <IoTodaySharp className="ml-1"/>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
