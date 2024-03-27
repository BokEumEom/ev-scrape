// src/components/WriteCommunityPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCommunityPost } from '../services/apiService';
import { CommunityPostCreate } from '../types';

const WriteCommunityPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const post: CommunityPostCreate = {
      title,
      content,
    };

    try {
      await createCommunityPost(post);
      navigate('/community');
    } catch (error) {
      console.error('Failed to create community post:', error);
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Write a New Post</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Post
      </button>
    </form>
  );
};

export default WriteCommunityPost;
