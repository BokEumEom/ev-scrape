// src/components/DropdownMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoPeopleSharp, IoCarSportSharp, IoDice } from 'react-icons/io5';
import { FaChargingStation } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DropdownMenu = ({ isOpen, onClose }) => {
  const handleItemClick = () => {
    onClose();
  };

  return isOpen ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
    >
      <ul className="py-1">
        <li>
          <NavLink
            to="/community"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            title="Community"
            onClick={handleItemClick}
          >
            <IoPeopleSharp className="inline-block mr-2" aria-label="Community" />
            커뮤니티
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vehiclespec"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            title="Vehicle Specifications"
            onClick={handleItemClick}
          >
            <IoCarSportSharp className="inline-block mr-2" aria-label="Vehicle Specifications" />
            차량제원
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/map"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            title="Charging Stations"
            onClick={handleItemClick}
          >
            <FaChargingStation className="inline-block mr-2" aria-label="Charging Stations" />
            충전소
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/game"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            title="Play Game"
            onClick={handleItemClick}
          >
            <IoDice className="inline-block mr-2" aria-label="Play Game" />
            게임
          </NavLink>
        </li>
      </ul>
    </motion.div>
  ) : null;
};

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DropdownMenu;
