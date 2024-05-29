// src/components/community/CommunityPostSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CommunityPostSkeleton: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center mb-4">
        <Skeleton circle={true} height={50} width={50} />
        <div className="ml-4">
          <Skeleton height={24} width={`80%`} />
          <Skeleton height={16} width={`50%`} />
        </div>
      </div>
      <Skeleton height={24} width={`60%`} />
      <Skeleton height={18} width={`90%`} className="mt-2" />
      <Skeleton height={18} width={`90%`} className="mt-2" />
      <Skeleton height={18} width={`90%`} className="mt-2" />
      <div className="flex mt-4 space-x-4">
        <Skeleton height={32} width={100} />
        <Skeleton height={32} width={100} />
        <Skeleton height={32} width={100} />
      </div>
    </div>
  );
};

export default CommunityPostSkeleton;
