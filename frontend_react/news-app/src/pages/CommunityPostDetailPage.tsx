// src/pages/CommunityPostDetailPage.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackOutline, IoPencil, IoSave } from 'react-icons/io5';
import usePostDetails from '@/hooks/usePostDetails';
import PostEditor from '@/components/community/PostEditor';
import PostDisplay from '@/components/community/PostDisplay';
import CommentsSection from '@/components/community/CommentsSection';
import { useLikeCommunityPost } from '@/hooks/useLikeCommunityPost';
import { CommunityPost } from '@/types';

const CommunityPostDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const parsedPostId = parseInt(postId, 10);
  const { post, isLoading, isError, error, updateMutation } = usePostDetails(parsedPostId);
  const likeMutation = useLikeCommunityPost(parsedPostId);
  const [isEditing, setIsEditing] = useState(false);

  // 편집 모드 토글 핸들러
  const handleEditToggle = () => setIsEditing((prev) => !prev);

  // 게시글 저장 핸들러
  const handleSave = (postData: Partial<CommunityPost>) => {
    updateMutation.mutate(postData);
    setIsEditing(false);
  };

  // 로딩 상태 처리
  if (isLoading) return <div className="text-center py-4">Loading post details...</div>;

  // 에러 상태 처리
  if (isError) return <div className="text-center text-red-500 py-4">Error loading post details: {error.message}</div>;

  // 게시글이 없는 경우 처리
  if (!post) return <div className="text-center py-4">Post not found.</div>;

  return (
    <div className="container mx-auto px-0 bg-gray-100 flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-white pt-16 sticky top-0">
        {/* 뒤로가기 버튼 */}
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
        {/* 편집 모드 토글 버튼 */}
        <button onClick={handleEditToggle} className="flex items-center text-gray-500 text-lg p-2 border rounded-full">
          {isEditing ? <IoSave /> : <IoPencil />}
        </button>
      </div>
      <div className="flex-grow flex flex-col overflow-auto pb-4">
        <div className="bg-white p-4 mb-2 flex-shrink-0">
          {isEditing ? (
            // 편집 모드일 때 게시글 편집기 렌더링
            <PostEditor post={post} onSave={handleSave} />
          ) : (
            // 기본 모드일 때 게시글 디스플레이 렌더링
            <PostDisplay post={post} onLike={() => likeMutation.mutate()} />
          )}
        </div>
        <div className="bg-white px-4 pt-4 flex-grow">
          <span className="text-xs font-bold">댓글</span>
          <CommentsSection postId={parsedPostId} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;
