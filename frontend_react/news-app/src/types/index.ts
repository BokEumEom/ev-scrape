// src/types/index.ts
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  link: string;
  published_at: string;
  isBookmarked?: boolean; // Optional property to track if the news item is bookmarked
  voteCount: number;
  views: number; // 조회수 속성을 추가합니다.
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

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPostCreate {
  title: string;
  content: string;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface RecentSearchesProps {
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  setRecentSearches: (searches: string[]) => void;
}

export interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}
