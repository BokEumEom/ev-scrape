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
  const nodeRef = useRef(null); // 추가된 부분
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
    <div {...swipeHandlers} className="flex flex-col items-stretch py-2 bg-white transition-all">
      <TransitionGroup>
        {selectedRegion === null ? (
          <CSSTransition nodeRef={regionListRef} classNames="fade" timeout={300} key="region-list">
            <div ref={nodeRef} className="w-full flex flex-col items-center">
              {renderRegionButtons()}
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition ref={announcementListRef} classNames="fade" timeout={300} key="announcement-list">
            <div ref={nodeRef} className="w-full">
              {renderAnnouncements()}
              <div className="fixed inset-x-0 bottom-5 px-5 text-center">
                <button onClick={() => setSelectedRegion(null)} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mx-auto bottom-5 left-1/2 transform -translate-x-1/2 fixed">
                  Back to regions
                </button>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default AnnouncementsPage;
