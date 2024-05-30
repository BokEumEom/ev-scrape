import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

// BottomSheetProps 인터페이스 정의: BottomSheet 컴포넌트의 props 타입을 정의합니다.
interface BottomSheetProps {
  children: React.ReactNode; // children: BottomSheet 내부에 렌더링될 React 노드들
  open: boolean; // open: BottomSheet가 열려 있는지 여부를 나타내는 boolean 값
  onClose: () => void; // onClose: BottomSheet를 닫을 때 호출되는 함수
  minHeight?: number; // minHeight: BottomSheet의 최소 높이, 기본값은 100
  maxHeight?: number; // maxHeight: BottomSheet의 최대 높이, 기본값은 화면 높이의 80%
}

// BottomSheet 컴포넌트 정의
const BottomSheet: React.FC<BottomSheetProps> = ({ children, open, onClose, minHeight = 100, maxHeight = window.innerHeight * 0.8 }) => {
  const y = useMotionValue(maxHeight); // useMotionValue 훅을 사용하여 y 좌표 값을 관리
  const opacity = useTransform(y, [minHeight, maxHeight], [1, 0]); // y 값을 기반으로 투명도를 설정

  // open 값이 변경될 때 y 값을 업데이트하기 위해 useEffect 사용
  useEffect(() => {
    y.set(open ? minHeight : maxHeight);
  }, [open, minHeight, maxHeight, y]);

  // 드래그가 끝났을 때 호출되는 함수
  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    if (info.point.y > maxHeight / 2) { // 드래그 위치가 최대 높이의 절반을 넘으면
      onClose(); // BottomSheet를 닫습니다
    } else {
      y.set(minHeight); // 그렇지 않으면 최소 높이로 설정합니다
    }
  };

  // Tailwind CSS 클래스를 변수로 정의
  const containerClasses = "fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-2xl z-50";
  const handleClasses = "h-1 w-10 bg-gray-300 rounded-full mx-auto mb-4";
  const contentClasses = "p-4";

  return (
    <motion.div
      initial={{ y: maxHeight }} // 초기 y 값 설정
      animate={{ y: open ? minHeight : maxHeight }} // open 값에 따라 y 값 애니메이션 설정
      transition={{ type: 'spring', stiffness: 300, damping: 30 }} // 스프링 애니메이션 설정
      className={containerClasses}
      style={{ y }} // y 값을 스타일로 설정
      drag="y" // y 방향으로만 드래그 가능
      dragConstraints={{ top: 0, bottom: maxHeight }} // 드래그 제한 설정
      onDragEnd={handleDragEnd} // 드래그가 끝났을 때 handleDragEnd 함수 호출
      aria-hidden={!open} // open 값에 따라 aria-hidden 속성 설정
      role="dialog" // 역할을 다이얼로그로 설정
      aria-labelledby="bottom-sheet-title" // 제목을 참조할 aria-labelledby 속성 설정
      aria-describedby="bottom-sheet-description" // 설명을 참조할 aria-describedby 속성 설정
    >
      <motion.div style={{ opacity }} className={contentClasses}>
        <div id="bottom-sheet-title" className={handleClasses}></div>
        {children}
        <button 
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700" 
          onClick={onClose} 
          aria-label="Close"
        >
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BottomSheet;
