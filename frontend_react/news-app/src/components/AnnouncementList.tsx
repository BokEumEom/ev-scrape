// src/components/AnnouncementsList.tsx
import React from 'react';
import { useTransition, animated } from 'react-spring';
import { Announcement } from '../types';

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  const transitions = useTransition(announcements, {
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  return (
    <div className="max-w-2xl mx-auto">
      {transitions((style, item) => (
        <animated.div key={item.link} style={style} className="border-b border-gray-200 py-4 mb-4 hover:bg-gray-100 transition duration-300 ease-in-out">
          <h2 className="text-lg md:text-xl font-semibold text-blue-800 mb-2">{item.title}</h2>
          <p className="text-sm md:text-base text-gray-600 mb-2">Published on: {item.date}</p>
          <a href={item.link} className="text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" rel="noopener noreferrer">Read more...</a>
        </animated.div>
      ))}
      {announcements.length === 0 && (
        <p className="text-gray-500 text-center">No announcements found.</p>
      )}
    </div>
  );
};

export default AnnouncementsList;
