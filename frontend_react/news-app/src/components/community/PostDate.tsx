// src/components/community/PostDate.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostDateProps {
  date: string;
}

const PostDate: React.FC<PostDateProps> = ({ date }) => {
  return (
    <div className="text-xs text-gray-500 mb-2">
      {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })}
    </div>
  );
};

export default PostDate;
