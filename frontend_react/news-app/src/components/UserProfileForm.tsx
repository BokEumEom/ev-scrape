// src/components/UserProfileForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";

const interests = [
  '운동', '스터디', '가족/육아', '영화', 
  '공예/미술', '반려동물', '게임', '음악',
  '음식', '문화/예술', '여행', '사진/영상',
  '독서', '패션', '테크', '차/오토바이', '투자/금융',
  '봉사활동', '뷰티/미용', '식물', '인테리어'
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
    <div className="p-4 pt-16 pb-20 bg-white max-w-md mx-auto">
      {/* 상단 바에 취소/뒤로 가기 버튼 추가 */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 text-lg p-3 rounded-full"
        >
          <IoChevronBackOutline />
        </button>
        <div>
          {/* 상단 바 우측 아이콘 배치 */}
        </div>
      </div>
      {/* 폼 제출 시 onSubmit 호출 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 프로필 이미지 및 이름 */}
        <label htmlFor="introduction" className="text-xs font-bold block mb-2">내 정보</label>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="profile-image mr-4">
              {/* Add your profile image here */}
            </div>
            <h2 className="font-bold text-lg">퍼펙트데이{/* 사용자 이름 */}</h2>
          </div>
          <button
            type="button"
            className="text-slate-700 font-semibold rounded-lg bg-gray-200 py-2 px-3 text-xs"
          >
            수정하기
          </button>
        </div>

        {/* 자기소개 입력 필드 */}
        <div>
          <label htmlFor="introduction" className="text-xs font-bold block mb-2">자기소개</label>
          <textarea
            id="introduction"
            {...register("introduction", { required: "자기소개를 입력해주세요." })}
            placeholder="내용을 입력해주세요."
            className="w-full rounded border border-gray-300 p-3"
            rows={4}
          />
          {errors.introduction && <p className="text-red-500 text-xs mt-1">{errors.introduction.message}</p>}
        </div>

        {/* 관심사 선택 버튼 */}
        <div>
          <span className="text-xs font-bold block mb-2">관심사</span>
          <div className="flex flex-wrap overflow-x-auto">
            {interests.map((interest, index) => (
              <div key={index} className="flex pb-2 items-center mr-2 last:mr-0">
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`text-xs whitespace-nowrap mr-2 px-4 py-2 border border-gray-300 rounded-full cursor-pointer 
                    ${selectedInterests.includes(interest) ? 
                      'bg-blue-500 text-white' : 
                      'text-gray-700 bg-white hover:bg-gray-100'}`}
                >
                  {interest}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 폼 제출 버튼 */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 text-sm hover:bg-blue-600"
          >
            프로필 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
