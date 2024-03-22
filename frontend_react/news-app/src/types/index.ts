// src/types/index.ts
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  link: string;
  published_at: string;
  isBookmarked?: boolean; // Optional property to track if the news item is bookmarked
  voteCount: number;
}

export interface Announcement {
  title: string;
  link: string;
  date: string;
}

export interface NewsItemVoteProps {
  newsId: number;
  onVote: (newsId: number, voteValue: number) => void;
  voteCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  // Additional fields as necessary
}