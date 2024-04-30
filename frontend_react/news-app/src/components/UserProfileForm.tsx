// src/components/UserProfileForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoPencil, IoSave } from "react-icons/io5";
import { UserProfile } from '../types'; // 사용자 프로필 타입을 import합니다.

interface UserProfileFormProps {
  user?: UserProfile; // user가 선택적으로 있을 수 있음을 나타냅니다. 초기 로딩이나 에러 상황을 고려.
  onClose: () => void; // 폼을 닫는 함수입니다.
}

const interests = [
  '운동', '스터디', '가족/육아', '영화', 
  '공예/미술', '반려동물', '게임', '음악',
  '음식', '문화/예술', '여행', '사진/영상',
  '독서', '패션', '테크', '차/오토바이', '투자/금융',
  '봉사활동', '뷰티/미용', '식물', '인테리어'
];

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Submit your form data here
    navigate('/mypage');
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest);
      } else {
        return [...current, interest];
      }
    });
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  return (
    <div className="p-4 pt-16 pb-20 bg-white max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-lg p-3 rounded-full">
          <IoChevronBackOutline />
        </button>
        <button onClick={handleEditToggle} className="flex item-center text-gray-500 text-lg p-2 border rounded-full">
          {isEditing ? <IoSave /> : <IoPencil />}
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 사용자 이름과 소개 부분이 수정되었습니다. */}
        <div className="mb-4">
          <label htmlFor="name" className="text-xs font-bold">이름</label>
          <input
            id="name"
            defaultValue={user?.name} // user 객체가 있을 경우 기본값으로 설정합니다.
            {...register("name", { required: true })}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="introduction" className="text-xs font-bold">자기소개</label>
          <textarea
            id="introduction"
            {...register("introduction", { required: "자기소개를 입력해주세요." })}
            className="w-full rounded border p-2"
            rows={4}
          ></textarea>
          {errors.introduction && <p className="text-red-500 text-xs">{errors.introduction.message}</p>}
        </div>
        <div className="mb-4">
          <span className="text-xs font-bold">관심사</span>
          <div className="flex flex-wrap">
            {interests.map((interest, index) => (
              <button key={index} type="button" onClick={() => toggleInterest(interest)}
                className={`m-1 text-xs px-4 py-2 border rounded-full cursor-pointer 
                ${selectedInterests.includes(interest) ? 'bg-neutral-700 text-white' : ''}`}>
                {interest}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 text-sm hover:bg-blue-600">
          프로필 등록
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;

