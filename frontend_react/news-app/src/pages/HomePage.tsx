// src/pages/HomePage.tsx
import React from 'react';
import HeroSection from '../components/HeroSection'; // You will need to create this component
import AboutEVSection from '../components/AboutEVSection'; // You will need to create this component
import CallToActionSection from '../components/CallToActionSection';
import LatestEVNewsSection from '../components/LatestEVNewsSection';
import EVReviewsSection from '../components/EVReviewsSection';
import GuidesAndResourcesSection from '../components/GuidesAndResourcesSection';

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
