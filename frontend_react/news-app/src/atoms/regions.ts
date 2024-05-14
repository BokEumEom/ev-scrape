// src/atoms/regions.ts
import { atom } from 'jotai';

export const regionsAtom = atom<string[]>([]);
export const selectedRegionAtom = atom<string | null>(null);
