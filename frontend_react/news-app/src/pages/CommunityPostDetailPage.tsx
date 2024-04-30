// src/pages/CommunityPostDetailPage.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackOutline, IoPencil, IoSave } from 'react-icons/io5';
import usePostDetails from '../hooks/usePostDetails';
import PostEditor from '../components/PostEditor';
import PostDisplay from '../components/PostDisplay';
import CommentsSection from '../components/CommentsSection';
import { useLikeCommunityPost } from '../hooks/useLikeCommunityPost';
import { CommunityPost } from '../types';

const CommunityPostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const parsedPostId = parseInt(postId, 10);
  const { post, isLoading, isError, error, updateMutation } = usePostDetails(parsedPostId);
  const likeMutation = useLikeCommunityPost(parsedPostId);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleSave = (postData: Partial<CommunityPost>) => {
    updateMutation.mutate(postData);
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading post details...</div>;
  if (isError) return <div>Error loading post details: {error.message}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="container mx-auto px-0 bg-gray-100 flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-white pt-16 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
        <button onClick={handleEditToggle} className="flex item-center text-gray-500 text-lg p-2 border rounded-full">
          {isEditing ? <IoSave /> : <IoPencil />}
        </button>
      </div>
      <div className="flex-grow flex flex-col overflow-auto pb-4">
        <div className="bg-white p-4 mb-2 flex-shrink-0">
          {isEditing ? (
            <PostEditor post={post} onSave={handleSave} />
          ) : (
            <PostDisplay post={post} onLike={() => likeMutation.mutate()} />
          )}
        </div>
        <div className="bg-white px-4 pt-4 flex-grow">
          <span className="text-xs font-bold">댓글</span>
          <CommentsSection postId={Number(post.id)} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;