// TabNavigation.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TabProps {
  name: string;
  tabKey: string; // Renamed from `key` to `tabKey`
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ name, tabKey, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-medium text-center relative ${
      isActive ? 'text-gray-800 font-semibold border-b-2 border-gray-500' : 'text-gray-500 hover:text-gray-700'
    }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {name}
    {isActive && <motion.div layoutId="underline" />}
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
        key={tab.key} // Continue using `key` here as it is used by React internally
        tabKey={tab.key} // Now passing `tabKey` to the `Tab` component
        name={tab.name}
        isActive={activeTab === tab.key}
        onClick={() => onTabChange(tab.key)}
      />
    ))}
  </nav>
);

export default TabNavigation;