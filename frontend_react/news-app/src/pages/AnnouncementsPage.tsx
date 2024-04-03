// src/pages/AnnouncementsPage.tsx
import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import AnnouncementList from '../components/AnnouncementList';
import { fetchAnnouncements } from '../services/apiService';
import Spinner from '../components/Spinner';
import { IoLocationSharp, IoEllipsisVertical } from 'react-icons/io5';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
// import '../styles/AnnouncementsPage.css'; // Ensure this import is correct

const initialRegions = ['incheon', 'incheon2', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan', 'goyang', 'sejong', 'wonju'];

const AnnouncementsPage = () => {
  const [regions, setRegions] = useState(initialRegions);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  // const regionListRef = useRef(null);
  // const announcementListRef = useRef(null);

  // React Query를 사용하여 선택된 지역에 대한 공고 데이터를 가져옵니다.
  const { data: announcements, isLoading, isError, error } = useQuery({
    queryKey: ['announcements', selectedRegion],
    queryFn: () => fetchAnnouncements(selectedRegion!),
    enabled: !!selectedRegion, // selectedRegion이 설정되어 있을 때만 쿼리를 활성화합니다.
  });

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
  };

  const renderRegionButtons = () => {
    return (
      <div className="w-full md:max-w-md mx-auto">
        <Reorder.Group
          axis="y"
          values={regions}
          onReorder={setRegions}
          className="flex flex-col items-center w-full px-1"
        >
          {regions.map((region: string) => (
            <Reorder.Item key={region} value={region} className="w-full mb-1">
              {/* Added margin-bottom for spacing */}
              <button
                onClick={() => handleSelectRegion(region)}
                className={`
                  ${selectedRegion === region ? 'bg-gray-700' : 'bg-gray-600'}
                  flex items-center justify-between text-white font-bold py-4 px-4
                  transition ease-in-out duration-300
                  hover:bg-green-600 rounded-md shadow cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  w-full
                `}
              >
                <div className="flex items-center">
                  <IoLocationSharp className="mr-2 text-2xl" />
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </div>
                <IoEllipsisVertical className="ml-2 text-2xl" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    );
  };
  
  const renderAnnouncements = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
      <AnnouncementList announcements={announcements} />
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedRegion !== null) {
        const nextRegionIndex = (regions.indexOf(selectedRegion) + 1) % regions.length;
        handleSelectRegion(regions[nextRegionIndex]);
      }
    },
    onSwipedRight: () => {
      if (selectedRegion !== null) {
        setSelectedRegion(null);
      }
    },
    trackMouse: true
  });

  const pageTransitionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <div {...swipeHandlers} className="flex flex-col items-stretch pt-16 py-20 bg-white transition-all min-h-screen md:flex-row">
      <AnimatePresence mode="wait">
        {selectedRegion === null ? (
          <motion.div
            key="region-list"
            variants={pageTransitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderRegionButtons()}
          </motion.div>
        ) : (
          <motion.div
            key="announcement-list"
            variants={pageTransitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderAnnouncements()}
          </motion.div>
        )}
      </AnimatePresence>
      
      {selectedRegion && (
        <div className="fixed inset-x-0 bottom-16 px-5 text-center">
          <button onClick={() => setSelectedRegion(null)} className="mt-4 bg-gray-100 hover:bg-gray-200 text-indigo-800 py-2 px-4 rounded-full transition-colors duration-300">
            Back to regions
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
