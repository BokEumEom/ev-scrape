// src/components/DropdownMenu.tsx
import React, { useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IoPeopleSharp, IoCarSportSharp, IoDice } from 'react-icons/io5';
import { FaChargingStation } from 'react-icons/fa6';
import { motion } from 'framer-motion';

// DropdownMenu 컴포넌트의 Props 타입 정의
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
  // onClose 함수가 변경되지 않는 한 handleItemClick 함수가 새로 생성되지 않도록 useCallback 사용
  const handleItemClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // 메뉴 항목 배열을 메모이제이션하여 성능 최적화
  const menuItems = useMemo(() => [
    { to: '/community', icon: IoPeopleSharp, label: '커뮤니티', title: 'Community' },
    { to: '/vehiclespec', icon: IoCarSportSharp, label: '차량제원', title: 'Vehicle Specifications' },
    { to: '/map', icon: FaChargingStation, label: '충전소', title: 'Charging Stations' },
    { to: '/game', icon: IoDice, label: '게임', title: 'Play Game' }
  ], []);

  return isOpen ? (
    // Framer Motion을 사용하여 애니메이션 효과 적용
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
    >
      <ul className="py-1">
        {menuItems.map(item => (
          <li key={item.to}>
            {/* NavLink를 사용하여 각 메뉴 항목을 렌더링 */}
            <NavLink
              to={item.to}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              title={item.title}
              onClick={handleItemClick}
            >
              <item.icon className="inline-block mr-2" aria-label={item.title} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  ) : null; // isOpen이 false일 경우 null 반환
};

export default DropdownMenu;
