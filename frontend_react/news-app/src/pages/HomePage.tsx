// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TopCards from '@/components/home/TopCards';
import MoreFeatures from '@/components/home/MoreFeatures';
import TopCardsSkeleton from '@/components/home/TopCardsSkeleton';
import MoreFeaturesSkeleton from '@/components/home/MoreFeaturesSkeleton';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="p-4 space-y-6 bg-gray-100">
        {loading ? <TopCardsSkeleton /> : <TopCards />}
        {loading ? <MoreFeaturesSkeleton /> : <MoreFeatures />}
      </div>
    </Layout>
  );
};

export default HomePage;
