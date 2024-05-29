// src/components/mypage/UserProfileSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfileSkeleton: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Skeleton circle={true} height={50} width={50} />
        <div className="ml-4">
          <Skeleton height={20} width={150} />
          <Skeleton height={15} width={100} />
        </div>
      </div>
      <Skeleton height={20} width={100} />
      <Skeleton height={20} width={100} className="mt-2" />
      <Skeleton height={20} width={100} className="mt-2" />
      <Skeleton height={20} width={100} className="mt-2" />
    </div>
  );
};

export default UserProfileSkeleton;
