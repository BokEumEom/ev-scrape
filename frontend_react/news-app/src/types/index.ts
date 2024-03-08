// src/types/index.ts
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  link: string;
  published_at: string;
}

export interface Announcement {
  title: string;
  link: string;
  date: string;
}