import React, { useState } from 'react';
import { CommunityPost } from '../../types';
import { useForm } from 'react-hook-form';

interface PostEditorProps {
    post: CommunityPost;
    onSave: (postData: Partial<CommunityPost>) => void;
}
  
const PostEditor: React.FC<PostEditorProps> = ({ post, onSave }) => {
  const { register, handleSubmit } = useForm<Partial<CommunityPost>>({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const onSubmit = (data: Partial<CommunityPost>) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        {...register('title', { required: true })}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <textarea
        {...register('content', { required: true })}
        className="resize-y block w-full h-52 px-4 py-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Changes
      </button>
    </form>
  );
};
  
  export default PostEditor;
