// src/pages/HomePage.tsx
import React from 'react';
import HeroSection from '../components/home/HeroSection'; // You will need to create this component
import AboutEVSection from '../components/home/AboutEVSection'; // You will need to create this component
import CallToActionSection from '../components/home/CallToActionSection';
import LatestEVNewsSection from '../components/home/LatestEVNewsSection';
import EVReviewsSection from '../components/home/EVReviewsSection';
import GuidesAndResourcesSection from '../components/home/GuidesAndResourcesSection';

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <AboutEVSection />
            <LatestEVNewsSection />
            <EVReviewsSection />
            <GuidesAndResourcesSection />
            <CallToActionSection />
        </div>
    );
}

export default HomePage;
