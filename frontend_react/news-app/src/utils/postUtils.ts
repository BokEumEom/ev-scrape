// src/utils/postUtils.ts
import { toast } from 'react-toastify';

// 좋아요 상태를 토글하는 함수
export function toggleLike(isLiked: boolean, likeCount: number): [boolean, number] {
  const newLiked = !isLiked;
  const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
  return [newLiked, newLikeCount];
}

// 성공 메시지를 표시하는 함수
export function showSuccessMessage(message: string): void {
  toast.success(message);
}

// 오류 메시지를 표시하는 함수
export function showErrorMessage(message: string): void {
  toast.error(message);
}
