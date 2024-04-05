// src/components/WriteCommunityPost.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateCommunityPost } from '../hooks/useCreateCommunityPost';

interface FormValues {
  title: string;
  content: string;
}

const WriteCommunityPost: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const { mutate: createPost, status } = useCreateCommunityPost();

  // Check if the mutation is currently loading
  const isLoading = status === 'pending';

  const onSubmit = (data: FormValues) => {
    createPost(data, {
      onSuccess: () => {
        navigate('/community'); // Redirect upon success
        reset(); // Reset form fields
      },
      onError: (error) => {
        console.error('Failed to create community post:', error);
        alert("글 작성에 실패했습니다. 다시 시도해주세요.");
        // Handle error (show notification or message)
      },
    });
  };

  return (
    <div className="write-post-container">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto my-10 p-4 pt-12">
        <h2 className="text-center text-2xl font-bold mb-4">글쓰기</h2>
        
        <input 
          {...register("title", { required: true })}
          placeholder="제목"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.title && <span className="text-red-500">제목은 필수입니다.</span>}

        <textarea
          {...register("content", { required: true })}
          placeholder="내용"
          rows={15}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        ></textarea>
        {errors.content && <span className="text-red-500">내용은 필수입니다.</span>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/community')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            게시
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteCommunityPost;
