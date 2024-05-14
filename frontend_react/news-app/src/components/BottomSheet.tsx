// src/components/BottomSheet.tsx
import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface BottomSheetProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, open, onClose }) => {
  const y = useMotionValue(300); // Initial position (partially visible)
  const opacity = useTransform(y, [0, 300], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.point.y > 300) { // Close when dragged down enough
      onClose();
    } else {
      y.set(0); // Reset position to top if not closed
    }
  };

  return (
    <motion.div
      initial={{ y: 300 }} // Initial y position for partial visibility
      animate={{ y: open ? 0 : 300 }} // Animate to top if open
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-2xl z-50"
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 300 }} // Allow dragging within these constraints
      onDragEnd={handleDragEnd}
    >
      <motion.div style={{ opacity }} className="p-4">
        <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-4"></div>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default BottomSheet;
