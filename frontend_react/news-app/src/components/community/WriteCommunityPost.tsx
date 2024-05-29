// src/components/WriteCommunityPost.tsx
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateCommunityPost } from '@/hooks/useCreateCommunityPost';
import { motion } from 'framer-motion';

interface FormValues {
  title: string;
  content: string;
}

const WriteCommunityPost: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>(); // React Hook Form을 사용한 폼 관리
  const { mutate: createPost, status } = useCreateCommunityPost(); // 커뮤니티 게시글 생성 훅
  const textareaRef = useRef<HTMLTextAreaElement>(null); // 텍스트 영역 참조

  // 현재 로딩 상태 확인
  const isLoading = status === 'pending';

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    createPost(data, {
      onSuccess: () => {
        navigate('/community'); // 성공 시 커뮤니티 페이지로 리디렉션
        reset(); // 폼 필드 초기화
      },
      onError: (error) => {
        console.error('Failed to create community post:', error);
        alert("글 작성에 실패했습니다. 다시 시도해주세요."); // 에러 처리 (알림 표시)
      },
    });
  };

  return (
    <motion.div
      initial={{ x: '100vh' }} // 초기 애니메이션 상태
      animate={{ x: 0 }} // 애니메이션 상태
      exit={{ x: '100vh' }} // 종료 애니메이션 상태
      transition={{ type: 'tween', stiffness: 260, damping: 20 }} // 애니메이션 전환 설정
      className="inset-0 bg-white p-4 z-50"
    >
      <div className="write-post-container">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-center text-2xl font-bold mb-4">글쓰기</h2>
          
          <div className="flex flex-col">
            <input 
              {...register("title", { required: true })}
              placeholder="제목"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <span className="text-red-500 mt-2">제목은 필수입니다.</span>}
          </div>

          <div className="flex flex-col">
            <textarea
              {...register("content", { required: true })}
              placeholder="내용"
              rows={15}
              className="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            ></textarea>
            {errors.content && <span className="text-red-500 mt-2">내용은 필수입니다.</span>}
          </div>

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
              {isLoading ? '게시 중...' : '게시'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default WriteCommunityPost;
