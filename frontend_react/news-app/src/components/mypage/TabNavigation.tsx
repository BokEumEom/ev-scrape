// src/components/mypage/TabNavigation.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TabProps {
  name: string;
  tabKey: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ name, tabKey, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-medium text-center relative ${
      isActive ? 'text-gray-800 font-semibold' : 'text-gray-500 hover:text-gray-700'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {name}
    {isActive && (
      <motion.div
        layoutId="underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </motion.button>
);

interface TabNavigationProps {
  tabs: { name: string; key: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => (
  <nav className="flex space-x-1 justify-around">
    {tabs.map((tab) => (
      <Tab
        key={tab.key}
        tabKey={tab.key}
        name={tab.name}
        isActive={activeTab === tab.key}
        onClick={() => onTabChange(tab.key)}
      />
    ))}
  </nav>
);

export default TabNavigation;
