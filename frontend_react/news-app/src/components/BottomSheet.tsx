// src/components/BottomSheet.tsx
import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface BottomSheetProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  minHeight?: number;
  maxHeight?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, open, onClose, minHeight = 100, maxHeight = window.innerHeight * 0.8 }) => {
  const y = useMotionValue(maxHeight);
  const opacity = useTransform(y, [minHeight, maxHeight], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.point.y > maxHeight / 2) {
      onClose();
    } else {
      y.set(minHeight);
    }
  };

  return (
    <motion.div
      initial={{ y: maxHeight }}
      animate={{ y: open ? minHeight : maxHeight }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-2xl z-50"
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: maxHeight }}
      onDragEnd={handleDragEnd}
      aria-hidden={!open}
      role="dialog"
      aria-labelledby="bottom-sheet-title"
      aria-describedby="bottom-sheet-description"
    >
      <motion.div style={{ opacity }} className="p-4">
        <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-4"></div>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default BottomSheet;
