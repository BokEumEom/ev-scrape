// src/pages/AnnouncementsPage.tsx
import React, { useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';
import AnnouncementList from '../components/AnnouncementList';
import { fetchAnnouncements } from '../services/apiService';
import Spinner from '../components/Spinner';
import '../styles/AnnouncementsPage.css'; // Ensure this import is correct

const regions = ['incheon', 'incheon2', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan'];

const AnnouncementsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const regionListRef = useRef(null);
  const announcementListRef = useRef(null);

  const handleSelectRegion = async (region: string) => {
    setSelectedRegion(region);
    setIsLoading(true);
    try {
      const data = await fetchAnnouncements(region);
      setAnnouncements(data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Fetching announcements for ${region} failed:`, error);
      setIsLoading(false);
    }
  };

  const renderRegionButtons = () => {
    return regions.map((region) => (
      <button
        key={region}
        onClick={() => handleSelectRegion(region)}
        className={`
          ${selectedRegion === region ? 'bg-gray-800' : 'bg-gray-700'} 
          text-white font-bold py-4 px-2 m-px 
          transition ease-in-out duration-300 
          hover:bg-gray-600 rounded-md shadow cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
          w-full
        `}
      >
        {region.charAt(0).toUpperCase() + region.slice(1)}
      </button>
    ));
  };
  
  const renderAnnouncements = () => {
    if (isLoading) {
      return <Spinner />;
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

  return (
    <div {...swipeHandlers} className="flex flex-col items-stretch py-16 bg-white transition-all min-h-screen"> {/* 상단 패딩 추가 */}
      <TransitionGroup>
        {selectedRegion === null ? (
          <CSSTransition nodeRef={regionListRef} classNames="fade" timeout={300} key="region-list">
            <div ref={regionListRef} className="w-full flex flex-col items-center">
              {renderRegionButtons()}
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition nodeRef={announcementListRef} classNames="fade" timeout={300} key="announcement-list">
            <div ref={announcementListRef} className="w-full pt-4 pb-20"> {/* 컨텐츠에 패딩 추가 */}
              {renderAnnouncements()}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
      <div className="fixed inset-x-0 bottom-16 px-5 text-center"> {/* 버튼 위치 조정 */}
        <button onClick={() => setSelectedRegion(null)} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mx-auto">
          Back to regions
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
