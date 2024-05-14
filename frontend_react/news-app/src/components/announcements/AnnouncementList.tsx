// src/components/announcements/AnnouncementList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Announcement } from '../../types'; // Assuming the type is defined

interface AnnouncementsListProps {
  announcements: Announcement[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-4 py-12">
      {announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          // Assuming 'id' is unique; use it as a key. If not, use index, but prefer unique IDs.
          <div key={index} className="border-b border-gray-200 p-2 flex flex-col">
            <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="hover:underline block">
              <h2 className="text-sm font-semibold text-gray-900">
                {announcement.title}
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                등록일 - {announcement.date}
              </p>
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
