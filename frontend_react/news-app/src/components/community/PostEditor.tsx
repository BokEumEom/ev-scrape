// src/components/community/PostEditor.tsx
import React, { useState } from 'react';
import { CommunityPost } from '@/types';
import { useForm } from 'react-hook-form';

interface PostEditorProps {
    post: CommunityPost;
    onSave: (postData: Partial<CommunityPost>) => void;
}
  
const PostEditor: React.FC<PostEditorProps> = ({ post, onSave }) => {
  // React Hook Form을 사용한 폼 관리
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<CommunityPost>>({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (data: Partial<CommunityPost>) => {
    onSave(data);
  };

  // 폼 필드 초기화 핸들러
  const handleReset = () => {
    reset({
      title: post.title,
      content: post.content,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 제목 입력 필드 */}
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold mb-1">Title</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: '제목은 필수입니다.' })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.title && <span className="text-red-500 mt-1">{errors.title.message}</span>}
      </div>

      {/* 내용 입력 필드 */}
      <div className="flex flex-col">
        <label htmlFor="content" className="font-semibold mb-1">Content</label>
        <textarea
          id="content"
          {...register('content', { required: '내용은 필수입니다.' })}
          className="resize-y block w-full h-52 px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.content && <span className="text-red-500 mt-1">{errors.content.message}</span>}
      </div>

      {/* 폼 버튼 */}
      <div className="flex justify-between">
        <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
          Reset
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PostEditor;
