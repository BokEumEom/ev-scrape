// src/components/home/MoreFeaturesSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MoreFeaturesSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <Skeleton height={24} width={150} />
    <div className="grid grid-cols-4 gap-6 mt-4">
      {Array(12).fill(0).map((_, index) => (
        <div key={index} className="flex flex-col items-center text-center space-y-2">
          <Skeleton circle={true} height={56} width={56} />
          <Skeleton height={16} width={80} />
        </div>
      ))}
    </div>
  </div>
);

export default MoreFeaturesSkeleton;
