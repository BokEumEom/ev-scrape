// src/components/home/TopCardsSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TopCardsSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    {Array(4).fill(0).map((_, index) => (
      <div key={index} className="p-4">
        <Skeleton height={120} />
      </div>
    ))}
  </div>
);

export default TopCardsSkeleton;
