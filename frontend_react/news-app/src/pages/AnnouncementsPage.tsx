// src/pages/AnnouncementsPage.tsx
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoChevronBackOutline } from "react-icons/io5";
import { useSwipeable } from 'react-swipeable';
import Announcements from '@/components/announcements/Announcements';
import RegionButtons from '@/components/announcements/RegionButtons';
import { fetchAnnouncements } from '@/services/newsService';

// 초기 지역 목록을 상수로 분리
const INITIAL_REGIONS = ['evportal', 'incheon', 'incheon2', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan', 'goyang', 'sejong', 'wonju'];

const AnnouncementsPage = () => {
  const [regions, setRegions] = useState(INITIAL_REGIONS); // 지역 목록 상태
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 선택된 지역 상태

  // React Query를 사용하여 선택된 지역에 대한 공고 데이터를 가져옴
  const { data: announcements, isLoading, isError, error } = useQuery({
    queryKey: ['announcements', selectedRegion], // 쿼리 키로 선택된 지역 사용
    queryFn: () => fetchAnnouncements(selectedRegion!), // 선택된 지역의 공고 데이터를 가져오는 함수
    enabled: !!selectedRegion, // selectedRegion이 설정되어 있을 때만 쿼리를 활성화
  });

  // 지역 선택 핸들러
  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
  };

  // 스와이프 핸들러
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedRegion !== null) {
        const nextRegionIndex = (regions.indexOf(selectedRegion) + 1) % regions.length;
        handleSelectRegion(regions[nextRegionIndex]); // 왼쪽 스와이프로 다음 지역 선택
      }
    },
    onSwipedRight: () => {
      if (selectedRegion !== null) {
        setSelectedRegion(null); // 오른쪽 스와이프로 지역 선택 해제
      }
    },
    trackMouse: true, // 마우스 이벤트도 추적
  });

  // 페이지 전환 애니메이션 설정
  const pageTransitionVariants = {
    hidden: { opacity: 0 }, // 숨김 상태
    visible: { opacity: 1 }, // 보임 상태
    exit: { opacity: 0 }, // 종료 상태
  };

  return (
    <div {...swipeHandlers} className="flex flex-col items-stretch bg-white transition-all md:flex-row m-4 py-[70px]">
      <AnimatePresence mode="wait">
        {selectedRegion === null ? (
          // 지역 버튼 목록 표시
          <motion.div
            key="region-buttons"
            variants={pageTransitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <RegionButtons regions={regions} selectedRegion={selectedRegion} onSelectRegion={handleSelectRegion} setRegions={setRegions} />
          </motion.div>
        ) : (
          // 공고 목록 표시
          <motion.div
            key="announcement-list"
            variants={pageTransitionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {isLoading && <div>Loading...</div>} {/* 로딩 상태 표시 */}
            {isError && <div>Error: {error.message}</div>} {/* 에러 메시지 표시 */}
            <Announcements isLoading={isLoading} announcements={announcements} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {selectedRegion && (
        // 뒤로 가기 버튼 표시
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
