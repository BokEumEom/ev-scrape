// src/components/ev_registration/TabNavigation.tsx
import React from 'react';
import PropTypes from 'prop-types';

interface TabNavigationProps {
  activeTab: 'chart' | 'table' | 'trend' | 'region';
  setActiveTab: (tab: 'chart' | 'table' | 'trend' | 'region') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-4 text-xs">
      <button
        className={`py-1 px-2 rounded-full ${activeTab === 'chart' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-500'}`}
        onClick={() => setActiveTab('chart')}
      >
        Chart View
      </button>
      <button
        className={`py-2 px-2 rounded-full ${activeTab === 'table' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-500'}`}
        onClick={() => setActiveTab('table')}
      >
        Table View
      </button>
      <button
        className={`py-2 px-2 rounded-full ${activeTab === 'trend' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-500'}`}
        onClick={() => setActiveTab('trend')}
      >
        Trend View
      </button>
      <button
        className={`py-2 px-2 rounded-full ${activeTab === 'region' ? 'bg-indigo-500 text-white' : 'bg-transparent text-gray-500'}`}
        onClick={() => setActiveTab('region')}
      >
        region View
      </button>
    </div>
  );
};

TabNavigation.propTypes = {
    activeTab: PropTypes.oneOf(['chart', 'table', 'trend', 'region']).isRequired,
    setActiveTab: PropTypes.func.isRequired,
  };

export default TabNavigation;
