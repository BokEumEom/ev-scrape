// src/components/AnnouncementList.tsx
import React from 'react';
import { Announcement } from '../types'; // Make sure this type is defined in your types file

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          <div
            key={index}
            className="border-b border-gray-200 py-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-lg md:text-xl font-semibold text-blue-800 mb-2">
              {announcement.title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-2">
              Published on: {announcement.date}
            </p>
            <a
              href={announcement.link}
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more...
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No announcements found.</p>
      )}
    </div>
  );
};

export default AnnouncementsList;
