// src/components/announcements/RegionButtons.tsx
import React, { useState } from 'react';
import { Reorder } from 'framer-motion'; // 드래그 앤 드롭 인터페이스를 위한 라이브러리
import { IoEllipsisVertical, IoArrowDown, IoLocationSharp } from 'react-icons/io5'; // 아이콘 라이브러리
import RegionItem from './RegionItem'; // 개별 지역 버튼 컴포넌트
import { regionMapping } from '@/utils/regionMapping'; // 지역 이름 매핑 유틸리티

// 컴포넌트 프로퍼티 타입 정의
interface RegionButtonsProps {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
  setRegions: (regions: string[]) => void;
}

// 편집 모드 아이콘
const SortIcon = (
  <svg className="fill-current text-blue-600 w-6 h-6" viewBox="0 0 24 24">
    <path d="M12 5l6 6H6l6-6zm0 14l-6-6h12l-6 6z" />
  </svg>
);

// 완료 아이콘
const CompleteIcon = (
  <svg className="fill-current text-green-500 w-6 h-6" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// 지역 버튼 컴포넌트 정의
const RegionButtons: React.FC<RegionButtonsProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  setRegions,
}) => {
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태 관리

  if (regions.length === 0) {
    return <div className="text-center py-4">No regions available.</div>; // 지역 목록이 없을 때 표시
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2">
        <span className="text-sm font-semibold">Regions</span>
        <button
          onClick={() => setIsEditMode(!isEditMode)} // 편집 모드 토글
          className="bg-gray-300 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label={isEditMode ? "Finish editing" : "Edit list"} // 접근성 레이블
        >
          {isEditMode ? CompleteIcon : SortIcon} {/* 편집 모드에 따라 아이콘 변경 */}
        </button>
      </div>
      {isEditMode ? (
        // 편집 모드에서 지역 목록 재정렬 가능
        <Reorder.Group axis="y" values={regions} onReorder={setRegions} className="flex flex-col items-center w-full">
          {regions.map((region: string) => (
            <Reorder.Item key={region} value={region} className="w-full mb-1">
              <div className="flex justify-start items-center text-white font-bold py-3 px-4 rounded-md cursor-pointer bg-gray-500">
                <IoLocationSharp className="text-xl" />
                <span className="flex-1 text-left ml-2">{regionMapping[region]}</span>
                <IoEllipsisVertical className="ml-auto text-2xl" />
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        // 기본 모드에서 지역 버튼 목록 표시
        regions.map((region) => (
          <RegionItem
            key={region}
            region={region}
            onSelect={() => onSelectRegion(region)} // 지역 선택 핸들러
            isSelected={selectedRegion === region} // 선택된 지역 여부
          />
        ))
      )}
      <div className="text-center pt-6">
        <span className="text-sm">Scroll for more</span> {/* 스크롤 안내 메시지 */}
        <IoArrowDown size={12} className="animate-bounce mx-auto mt-4" /> {/* 스크롤 안내 아이콘 */}
      </div>
    </div>
  );
};

export default RegionButtons;
