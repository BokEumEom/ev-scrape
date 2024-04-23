// src/pages/CommunityPostDetailPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsSection from '../components/CommentsSection';
import { useLikeCommunityPost } from '../hooks/useLikeCommunityPost';
import { fetchCommunityPostDetails } from '../services/apiService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoHeartOutline, IoHeart } from "react-icons/io5";

const CommunityPostDetailPage = () => {
  const { postId } = useParams();
  const numericPostId = Number(postId);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: post, isLoading, error } = useQuery({
      queryKey: ['communityPost', numericPostId],
      queryFn: () => fetchCommunityPostDetails(numericPostId),
      enabled: !!numericPostId,
      onSuccess: (data) => {
          setIsLiked(data.isLikedByCurrentUser);
          setLikeCount(data.likeCount);
      }
  });

  if (!post) {
      console.log("Post data is not available or not fetched yet.");
  }

  const { mutate: likePost } = useLikeCommunityPost();

  const handleLike = () => {
    if (!post || typeof numericPostId !== 'number') {
      console.error('Invalid postId or post data.');
      alert('Failed to like the post. Please try again.');
      return;
    }
  
    likePost(numericPostId, {
      onError: (error) => {
        console.error('Error liking the post:', error);
        alert('Failed to like the post. Please try again.');
      },
      onSuccess: () => {
        console.log('Post liked successfully');
      }
    });
  };  

  if (isLoading) return <div>Loading post details...</div>;
  if (error) return <div>Error loading post details. {error.message}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="container mx-auto px-0 bg-gray-100">
      <div className="flex justify-between items-center bg-white pt-16">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
      </div>
      <div className="bg-white p-4 mb-2">
        <h1 className="text-lg font-semibold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-600">{post.content}</p>
        <button 
          onClick={handleLike} 
          disabled={!post || isLoading}  // Disable the button if post data is not loaded
          className="flex items-center text-sm mr-3"
        >
          {isLiked ? (
            <span className="text-red-500"><IoHeart /></span>
          ) : (
            <span className="text-red-500"><IoHeartOutline /></span>
          )}
          <span className="ml-1">좋아요</span>
        </button>
      </div>
      <div className="bg-white p-4 mb-2 mt-2">
        <span className="text-xs font-bold">댓글 </span>
        <CommentsSection postId={numericPostId} />
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;
