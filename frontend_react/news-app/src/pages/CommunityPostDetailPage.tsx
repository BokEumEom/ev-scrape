// src/pages/CommunityPostDetailPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoPencil, IoSave } from "react-icons/io5";
import usePostDetails from '../hooks/usePostDetails';
import PostEditor from '../components/PostEditor';
import PostDisplay from '../components/PostDisplay';
import CommentsSection from '../components/CommentsSection';

const CommunityPostDetailPage = () => {
  const navigate = useNavigate();
  const {
    post,
    isLoading,
    isError,
    error,
    likeMutation,
    updateMutation,
    isEditing,
    setIsEditing,
    isLiked,
    likeCount,
  } = usePostDetails();

  const handleEditToggle = () => setIsEditing(!isEditing);

  if (isLoading) return <div>Loading post details...</div>;
  if (isError) return <div>Error loading post details: {error.message}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="container mx-auto px-0 bg-gray-100">
      <div className="flex justify-between items-center bg-white pt-16">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
        <button onClick={handleEditToggle} className="text-gray-500 text-lg p-3 rounded-full">
          {isEditing ? <IoSave /> : <IoPencil />}
        </button>
      </div>
      <div className="bg-white p-4 mb-2">
        {isEditing ? (
          <PostEditor post={post} onSave={updateMutation.mutate} />
        ) : (
          <PostDisplay post={post} onLike={likeMutation.mutate} isLiked={isLiked} likeCount={likeCount} />
        )}
      </div>     
      <div className="bg-white p-4 mb-2 mt-2">
        <span className="text-xs font-bold">댓글</span>
        <CommentsSection postId={Number(post.id)} />
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;
