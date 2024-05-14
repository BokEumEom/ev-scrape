// src/pages/AnnouncementsPage.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import RegionButtons from '../components/announcements/RegionButtons';
import Announcements from '../components/announcements/Announcements';
import { fetchAnnouncements } from '../services/apiService';
import { AnimatePresence, motion } from 'framer-motion';
import { IoChevronBackOutline } from "react-icons/io5";

const initialRegions = ['evportal', 'incheon', 'incheon2', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan', 'goyang', 'sejong', 'wonju'];

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
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div {...swipeHandlers} className="flex flex-col items-stretch py-14 bg-white transition-all min-h-screen md:flex-row">
      <AnimatePresence mode="wait">
        {selectedRegion === null ? (
          <motion.div
            key="announcement-list"
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
        <div className="fixed pt-8 top-4 left-4 text-center">
          <button onClick={() => setSelectedRegion(null)} className="text-gray-500 text-lg p-2 mt-4">
            <IoChevronBackOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
