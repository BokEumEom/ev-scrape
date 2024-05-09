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
  likeCount: number;
  isLikedByCurrentUser: boolean;
  commentCount: number;
  comments: string;
  created_at: string;
  updated_at: string;
}

export interface Comments {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPostCreate {
  title: string;
  content: string;
}

export interface CommunityPostsResponse {
  items: CommunityPost[];
  total: number;
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

export interface VehicleSpec {
  [key: string]: string | number | null;
  manufacturer: string;
  model: string;
  drive_type: string;
  battery_type: string;
  battery_capacity: number | null;
  range_km: number | null;
  acceleration: number | null;
  weight_kg: number | null;
  storage_l: number | null;
  wheel_size: string;
  seating_capacity: number | null;
  display_inch: number | null;
  minimum_ground_clearance_mm: number | null;
  width_mm: number | null;
  height_mm: number | null;
  length_mm: number | null;
}

export class ApiError extends Error {
  statusCode: number;
  errors?: any;

  constructor(statusCode: number, message: string, errors?: any) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface ApiFieldError {
  field: string; // The field related to the error
  message: string; // A specific message about what is wrong with the field
}