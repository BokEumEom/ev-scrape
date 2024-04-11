// src/pages/AnnouncementsPage.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import RegionButtons from '../components/RegionButtons';
import Announcements from '../components/Announcements';
import { fetchAnnouncements } from '../services/apiService';
import { AnimatePresence, motion } from 'framer-motion';

const initialRegions = ['incheon', 'incheon2', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan', 'goyang', 'sejong', 'wonju'];

const AnnouncementsPage = () => {
  const [regions, setRegions] = useState(initialRegions);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // React Query를 사용하여 선택된 지역에 대한 공고 데이터를 가져옵니다.
  const { data: announcements, isLoading, isError, error } = useQuery({
    queryKey: ['announcements', selectedRegion],
    queryFn: () => fetchAnnouncements(selectedRegion!),
    enabled: !!selectedRegion, // selectedRegion이 설정되어 있을 때만 쿼리를 활성화합니다.
  });

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
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
            <RegionButtons regions={regions} selectedRegion={selectedRegion} onSelectRegion={handleSelectRegion} setRegions={setRegions} />
          </motion.div>
        ) : (
          <motion.div
            key="announcement-list"
            variants={pageTransitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Announcements isLoading={isLoading} announcements={announcements} />
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
