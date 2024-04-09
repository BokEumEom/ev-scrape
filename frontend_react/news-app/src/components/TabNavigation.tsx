// src/components/TabNavigation.tsx
import React from 'react';
import { tabs } from '../constants/constants'

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`py-2 px-4 ${activeTab === tab.key ? 'text-blue-600' : 'text-gray-500'}`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
