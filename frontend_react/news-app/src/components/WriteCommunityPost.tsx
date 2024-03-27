// src/components/WriteCommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCommunityPost } from '../services/apiService';
import { CommunityPostCreate } from '../types';

const WriteCommunityPost: React.FC = () => {
  const [postText, setPostText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Splitting the postText into title and content based on the first line break
    const [title, ...contentLines] = postText.split('\n');
    const content = contentLines.join('\n');

    // Constructing the post object based on the assumption that the first line is the title
    const post: CommunityPostCreate = {
      title: title.trim(), // Trimming whitespace from the title
      content: content.trim(), // Trimming whitespace from the content
    };

    try {
      // Sending the post object to the server
      await createCommunityPost(post);
      navigate('/community'); // Redirecting the user back to the community page upon successful submission
    } catch (error) {
      console.error('Failed to create community post:', error);
      // You might want to display an error message to the user here
    }
  };

  const handleCancel = () => {
    navigate('/community'); // Taking the user back to the community page without making a post
  };

  return (
    <div className="write-post-container">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-10 p-4 pt-12">
        <h2 className="text-center text-2xl font-bold mb-4">글쓰기</h2>
        <textarea
          id="post"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder=" 나누고 싶은 생각이 있으신가요?"
          rows={15}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            게시
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteCommunityPost;
