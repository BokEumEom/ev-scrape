// src/pages/CommunityPostDetailPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentsSection from '../components/community/CommentsSection';
import { useLikeCommunityPost } from '../hooks/useLikeCommunityPost';
import { fetchCommunityPostDetails, updateCommunityPost } from '../services/apiService';
import { useQuery, useMutation } from '@tanstack/react-query';
import { IoChevronBackOutline, IoHeartOutline, IoHeart, IoPencil, IoSave } from "react-icons/io5";
import { toast } from 'react-toastify';

const CommunityPostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('52'); // Default height
  const handleRef = useRef(null); // Ref for the draggable handle

  const { data: post, isLoading, error } = useQuery({
      queryKey: ['communityPost', numericPostId],
      queryFn: () => fetchCommunityPostDetails(numericPostId),
      enabled: !!numericPostId,
      onSuccess: (data) => {
          setIsLiked(data?.isLikedByCurrentUser);
          setLikeCount(data?.likeCount);
      },
  });

  const [isLiked, setIsLiked] = useState(post?.isLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post?.likeCount);

  const { mutate: likePost } = useLikeCommunityPost(setIsLiked, setLikeCount); // 훅 초기화 시 상태 업데이트 함수 전달

  const handleLike = () => {
    if (!post || typeof numericPostId !== 'number' || isNaN(numericPostId)) {
      toast.error('Invalid post or post ID.');
      return;
    }

    likePost(numericPostId, {
      onError: (error) => {
        toast.error('Failed to like the post. Please try again.');
      },
      onSuccess: () => {
        toast.success('Post liked successfully');
      }
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateCommunityPost,
    onSuccess: () => {
      toast.success('Post updated successfully');
      setEditing(false);
      refetch(); // 업데이트된 데이터를 가져옵니다.
    },
    onError: (error) => {
      toast.error(`Failed to update post: ${error.message}`);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      try {
        const postData = { title, content };
        await updateCommunityPost({ postId: numericPostId, postData });
        toast.success('Post updated successfully');
        setEditing(false);
        // Optionally, refresh the post details
      } catch (error) {
        toast.error(`Failed to update post: ${error.message}`);
      }
    } else {
      toast.error("Title and content cannot be empty.");
    }
  };   

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  // Function to handle resizing
  const startResize = (e) => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  };

  const resize = (e) => {
    if (handleRef.current) {
      const newHeight = e.clientY - handleRef.current.getBoundingClientRect().top;
      setTextareaHeight(`${newHeight}px`);
    }
  };

  const stopResize = () => {
    document.removeEventListener('mousemove', resize);
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
        <button onClick={() => setEditing(!editing)} className="text-gray-500 text-lg p-3 rounded-full">
          {editing ? <IoSave /> : <IoPencil />}
        </button>
      </div>
      <div className="bg-white p-4 mb-2">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-lg leading-tight focus:outline-none focus:border-blue-500"
            />
            <textarea
              style={{ height: textareaHeight }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full h-52 px-4 py-2 border border-gray-300 rounded-md text-base leading-normal focus:outline-none focus:border-blue-500"
            />
            <div
              ref={handleRef}
              onMouseDown={startResize}
              className="cursor-row-resize h-2 bg-gray-300 rounded-full"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-lg font-semibold mb-2">{title}</h1>
            <p className="text-sm text-gray-600">{content}</p>
          </>
        )}
        <button 
          onClick={handleLike}
          disabled={!post || isLoading}
          className="flex items-center text-sm py-3 mr-3"
        >
          {isLiked ? <IoHeart className="text-red-500" /> : <IoHeartOutline className="text-red-500" />}
          <span className="ml-1">좋아요</span>
        </button>
      </div>
      <div className="bg-white p-4 mb-2 mt-2">
        <span className="text-xs font-bold">댓글</span>
        <CommentsSection postId={numericPostId} />
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;
