// src/pages/AnnouncementsPage.tsx
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import AnnouncementList from '../components/AnnouncementList';
import { fetchAnnouncements } from '../services/apiService';
import Spinner from '../components/Spinner';

const regions = ['Incheon', 'Gyeonggi', 'Seoul', 'Koroad', 'Gwangju'];

const AnnouncementsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slideInStyles, setSlideInStyles] = useSpring(() => ({ opacity: 1, transform: 'translateX(0%)' }));

  const handleSwipe = (deltaX: number) => {
    // Swipe right: positive deltaX, swipe left: negative deltaX
    const index = regions.indexOf(selectedRegion);
    if (deltaX < 0) { // Swiped left
      const nextIndex = (index + 1) % regions.length;
      handleSelectRegion(regions[nextIndex]);
    } else if (deltaX > 0) { // Swiped right
      const nextIndex = (index - 1 + regions.length) % regions.length;
      handleSelectRegion(regions[nextIndex]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData.deltaX)
  });

  const handleSelectRegion = async (region: string) => {
    setSelectedRegion(region);
    setIsLoading(true); // Start loading
    setSlideInStyles({ opacity: 0 }); // Begin slide out effect
  
    try {
      const data = await fetchAnnouncements(region.toLowerCase());
      setAnnouncements(data);
    } catch (error) {
      console.error(`Fetching announcements for ${region} failed:`, error);
    } finally {
      setIsLoading(false); // Stop loading
      setSlideInStyles({ opacity: 1 }); // Begin slide in effect
    }
  };
  
  return (
    <div {...swipeHandlers} className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center bg-white p-3 shadow-lg mb-4">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => handleSelectRegion(region)}
            className={`text-sm sm:text-base lg:text-lg px-3 py-1 mr-2 mb-2 ${
                selectedRegion === region
                ? 'bg-green-500 text-white font-bold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
            >
            {region}
          </button>
        ))}
      </div>
      <animated.div style={slideInStyles} className="flex-grow p-10">
        {isLoading && <Spinner />}
        {!isLoading && <AnnouncementList announcements={announcements} />}
      </animated.div>
    </div>
  );
};

export default AnnouncementsPage;
