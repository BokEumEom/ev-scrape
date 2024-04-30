// src/atoms/postAtoms.ts
import { atom } from 'jotai';

// isEditing 상태를 관리하는 Atom
export const isEditingAtom = atom(false);

// Factory function to create a unique atom for each post
export const makeIsLikedAtom = (postId: number) => atom<boolean>(false);
export const makeLikeCountAtom = (postId: number) => atom<number>(0);