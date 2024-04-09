import { MotionProps } from 'framer-motion';

// 탭 구성 상수
export const tabs = [
  { name: '작성한 글', key: 'posts' },
  { name: '댓글단 글', key: 'comments' },
  { name: '저장한 글', key: 'saves' },
];

// 페이지 전환 효과에 대한 상수
export const pageTransitionEffects: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
