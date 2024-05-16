// src/pages/HomePage.tsx
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import AboutEVSection from '@/components/home/AboutEVSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import EVReviewsSection from '@/components/home/EVReviewsSection';
import GuidesAndResourcesSection from '@/components/home/GuidesAndResourcesSection';
import LatestEVNewsSection from '@/components/home/LatestEVNewsSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutEVSection />
      <LatestEVNewsSection />
      <EVReviewsSection />
      <GuidesAndResourcesSection /> 
      <CallToActionSection />
    </Layout>
  );
};

export default HomePage;
