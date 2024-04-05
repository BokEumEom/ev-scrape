// src/components/UserProfileForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const interests = [
  '운동', '스터디', '가족여행', '독서치료', 
  '예/미술', '반려동물', '게임', '업무',
  '음식', '문화/예술', '여행', '사진/영상',
  '독서', '패션', '테크', '치/요로바이', '투자/금융',
  '앙숙생활', '뷰티/미용', '실험', '인테리어'
];

const UserProfileForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Submit your form data here
    navigate('/mypage');
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest);
      } else {
        return [...current, interest];
      }
    });
  };

  return (
    <div className="p-4 pt-16 pb-20">
      {/* 상단 바에 취소/뒤로 가기 버튼 추가 */}
      <div className="flex justify-between items-center">
          <button
          onClick={() => navigate(-1)}
          className="text-gray-500 text-lg p-2 rounded-md"
          >
          &larr;
          </button>
          <div>
          {/* 상단 바 우측 아이콘 배치 */}
          </div>
      </div>
      {/* 폼 제출 시 onSubmit 호출 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* 프로필 이미지 및 이름 */}
        <div className="text-center">
          {/* 프로필 이미지를 여기에 추가하십시오 */}
          <h2 className="font-bold text-lg">{/* 사용자 이름 */}</h2>
          <p className="text-sm text-gray-600">{/* 가입 날짜 등 추가 정보 */}</p>
        </div>

        {/* 자기소개 입력 필드 */}
        <div>
          <textarea
            {...register("introduction", { required: "자기소개를 입력해주세요." })}
            placeholder="내용을 입력해주세요."
            className="w-full rounded border p-2"
            rows={3}
          />
          {errors.introduction && <p className="text-red-500">{errors.introduction.message}</p>}
        </div>

        {/* 관심사 선택 버튼 */}
        <div className="grid grid-cols-3 gap-2">
          {interests.map((interest, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`py-2 px-4 rounded ${selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* 폼 제출 버튼 */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
          >
            프로필 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
