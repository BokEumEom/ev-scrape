// src/components/community/PostContent.tsx
import React from 'react';

interface PostContentProps {
  content: string;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const PostContent: React.FC<PostContentProps> = ({ content, isExpanded, toggleExpand }) => {
  const truncatedContent = isExpanded ? content : `${content.substr(0, 100)}...`;

  return (
    <div>
      <p className="text-xs text-gray-600 mb-3" style={{ whiteSpace: 'pre-wrap' }} onClick={toggleExpand}>
        {truncatedContent}
      </p>
      {!isExpanded && (
        <button className="text-xs text-blue-500 hover:underline" onClick={toggleExpand}>
          더보기
        </button>
      )}
    </div>
  );
};

export default PostContent;
