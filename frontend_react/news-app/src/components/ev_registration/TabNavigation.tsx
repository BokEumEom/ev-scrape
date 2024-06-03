// src/components/ev_registration/TabNavigation.tsx
import React from 'react';
import PropTypes from 'prop-types';

interface TabNavigationProps {
  activeTab: 'chart' | 'table' | 'trend';
  setActiveTab: (tab: 'chart' | 'table' | 'trend') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        className={`py-2 px-4 border-b-2 ${activeTab === 'chart' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-gray-500'}`}
        onClick={() => setActiveTab('chart')}
      >
        Chart View
      </button>
      <button
        className={`py-2 px-4 border-b-2 ${activeTab === 'table' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-gray-500'}`}
        onClick={() => setActiveTab('table')}
      >
        Table View
      </button>
      <button
        className={`py-2 px-4 border-b-2 ${activeTab === 'trend' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-gray-500'}`}
        onClick={() => setActiveTab('trend')}
      >
        Trend View
      </button>
    </div>
  );
};

TabNavigation.propTypes = {
    activeTab: PropTypes.oneOf(['chart', 'table', 'trend']).isRequired,
    setActiveTab: PropTypes.func.isRequired,
  };

export default TabNavigation;
