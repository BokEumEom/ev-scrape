// src/pages/AnnouncementsPage.tsx
import React, { useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';
import AnnouncementList from '../components/AnnouncementList';
import { fetchAnnouncements } from '../services/apiService';
import Spinner from '../components/Spinner';
import '../styles/AnnouncementsPage.css'; // Ensure this import is correct

const regions = ['incheon', 'gyeonggi', 'seoul', 'koroad', 'gwangju', 'bucheon', 'ulsan'];

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
        className={`region-btn ${selectedRegion === region ? 'selected' : ''}`}
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
    <div {...swipeHandlers} className="announcement-page">
      <TransitionGroup>
        {selectedRegion === null ? (
          <CSSTransition nodeRef={regionListRef} classNames="fade" timeout={300} key="region-list">
            <div ref={nodeRef} className="region-list">
              {renderRegionButtons()}
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition ref={announcementListRef} classNames="fade" timeout={300} key="announcement-list">
            <div ref={nodeRef} className="announcement-list">
              {renderAnnouncements()}
              <button onClick={() => setSelectedRegion(null)} className="back-to-regions-btn">Back to regions</button>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default AnnouncementsPage;
