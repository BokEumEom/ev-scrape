// src/components/ActivityContent.tsx
import React from 'react';

const ActivityContent = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <div>Posts content...</div>;
      case 'comments':
        return <div>Comments content...</div>;
      case 'saves':
        return <div>Saves content...</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ActivityContent;
