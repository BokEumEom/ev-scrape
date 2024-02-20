// src/stores.js
import { writable } from 'svelte/store';

// 뉴스 메뉴
export const newsStore = writable([]);
export const commentsStore = writable({});

// 공고 메뉴
export const icnAnnouncements = writable([]);
export const kykiAnnouncements = writable([]);
export const seoulAnnouncements = writable([]);
