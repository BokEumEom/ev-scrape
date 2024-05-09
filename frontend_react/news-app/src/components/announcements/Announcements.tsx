// src/components/Announcements.tsx
import React from 'react';
import AnnouncementList from './AnnouncementList';
import Spinner from '../Spinner';

interface AnnouncementsProps {
  isLoading: boolean;
  announcements: any; // 적절한 타입으로 교체해주세요
}

const Announcements: React.FC<AnnouncementsProps> = ({ isLoading, announcements }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return <AnnouncementList announcements={announcements} />;
};

export default Announcements;
