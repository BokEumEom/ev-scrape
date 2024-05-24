// src/components/mypage/TabContent.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabContentProps {
  activeTab: string;
  tabs: { key: string; content: React.ReactNode }[];
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tabs }) => (
  <div className="relative">
    <AnimatePresence mode="wait">
      {tabs.map((tab, index) => (
        activeTab === tab.key && (
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {tab.content}
          </motion.div>
        )
      ))}
    </AnimatePresence>
  </div>
);

export default TabContent;

