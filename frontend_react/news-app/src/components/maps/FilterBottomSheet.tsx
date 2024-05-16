// src/components/maps/FilterBottomSheet.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? '0%' : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-2xl z-50 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">충전소 찾기 😊</h2>
      </div>
      <div className="mb-6">
      <span className="text-sm font-bold">지역</span>
        <div className="flex items-center gap-2">
          <select className="w-full p-2 border rounded">
            <option>전체</option>
            <option>서울</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>전체</option>
            <option>종로구</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
      <span className="text-sm font-bold">개방여부</span>
        <div className="flex items-center gap-2">
          <button className="text-xs px-4 py-2 border rounded-full">충전소 전체</button>
          <button className="text-xs px-4 py-2 border rounded-full">개방 충전소만</button>
        </div>
      </div>
      <div className="mb-6">
      <span className="text-sm font-bold">결제방법</span>
        <div className="flex items-center gap-2">
          <button className="text-xs px-4 py-2 border rounded-full">결제방법 전체</button>
          <button className="text-xs px-4 py-2 border rounded-full">T 전기차 충전만</button>
        </div>
      </div>
      <div className="mb-6">
      <span className="text-sm font-bold">커넥터</span>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="text-xs px-4 py-2 border rounded-full">커넥터 전체</button>
          <button className="text-xs px-4 py-2 border rounded-full">내차 커넥터</button>
          <button className="text-xs px-4 py-2 border rounded-full">AC완속</button>
          <button className="text-xs px-4 py-2 border rounded-full">DC콤보</button>
          <button className="text-xs px-4 py-2 border rounded-full">DC차데모</button>
          <button className="text-xs px-4 py-2 border rounded-full">AC3상</button>
          <button className="text-xs px-4 py-2 border rounded-full">수퍼차저</button>
        </div>
      </div>
      <div className="mb-6">
      <span className="text-sm font-bold">운영기관</span>
        <select className="w-full p-2 border rounded">
          <option>운영기관 전체</option>
        </select>
      </div>
      <div className="flex justify-between gap-1">
        <button onClick={onClose} className="px-4 py-2 w-1/2 border border-gray-300 text-gray-700 rounded">닫기</button>
        <button onClick={onClose} className="px-4 py-2 w-1/2 bg-blue-500 text-white rounded">적용하기</button>
      </div>
    </motion.div>
  );
};

export default FilterBottomSheet;
