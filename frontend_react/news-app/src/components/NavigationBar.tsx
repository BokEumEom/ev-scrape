// src/components/NavigationBar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch, IoPeopleSharp, IoCarSportSharp } from 'react-icons/io5';
import { FaChargingStation } from 'react-icons/fa6';
import { Divide as Hamburger } from 'hamburger-react';
import { motion } from 'framer-motion';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-gray-800 p-1 flex justify-between items-center z-10">
      <div className="flex items-center">
        <span className="font-bold text-xl p-2 mr-3 h-[3rem]">EVTrend</span>
      </div>
      <ul className="flex items-center">
        <li className="mr-4">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-gray-700' : 'text-white'}>
            <IoSearch className="text-gray-700 text-2xl" aria-label="검색"/>
          </NavLink>
        </li>
        <li className="relative">
          <Hamburger toggled={isOpen} toggle={setIsOpen} color="#4B5563" size={24} />
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
            >
              <ul className="py-1">
                <li>
                  <NavLink to="/community" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <IoPeopleSharp className="inline-block mr-2" aria-label="채팅" />
                    커뮤니티
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/vehiclespec" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <IoCarSportSharp className="inline-block mr-2" aria-label="차량제원" />
                    차량제원
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/map" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <FaChargingStation className="inline-block mr-2" aria-label="충전소" />
                    충전소
                  </NavLink>
                </li>
              </ul>
            </motion.div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
