// src/stores.js
import { writable } from 'svelte/store';

// 뉴스 메뉴
export const newsStore = writable({ newsList: [], lastFetch: Date.now() });
export const commentsStore = writable({});

// 댓글 카운트
export const commentsCountStore = writable(new Map());

// 공고 메뉴
export const icnAnnouncements = writable([]);
export const kykiAnnouncements = writable([]);
export const seoulAnnouncements = writable([]);
export const koroadAnnouncements = writable([]);
export const gwangjuAnnouncements = writable([]);
