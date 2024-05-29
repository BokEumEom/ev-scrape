// src/constants/constants.ts
import { Variants } from 'framer-motion';

// 탭 구성 상수
export const tabs = [
  { name: '작성한 글', key: 'posts' },
  { name: '댓글단 글', key: 'comments' },
  { name: '저장한 글', key: 'saves' },
];

// 페이지 전환 효과에 대한 상수 (Variants 타입 사용)
export const pageTransitionEffects: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

// 페이지 크기 상수
export const PAGE_SIZE = 10;

// API 기본 URL 상수
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
