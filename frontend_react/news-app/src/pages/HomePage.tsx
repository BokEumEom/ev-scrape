// src/pages/HomePage.tsx
import React from 'react';
import HeroSection from '../components/HeroSection'; // You will need to create this component
import AboutEVSection from '../components/AboutEVSection'; // You will need to create this component

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <AboutEVSection />
        </div>
    );
}

export default HomePage;
