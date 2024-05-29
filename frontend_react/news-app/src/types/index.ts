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
  avatarUrl: string;
  name: string;
  joinDate: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  joinDate: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

// SignIn and SignUp
export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
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
  status: number;
  errors?: string[];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export interface ApiFieldError {
  field: string; // The field related to the error
  message: string; // A specific message about what is wrong with the field
}

// Kakao Map
export interface LatLng {
  lat: number;
  lng: number;
}

export interface MarkerInfo {
  id: number;
  name: string;
  position: LatLng;
}

// VehicleSpec
export interface VehicleDetails {
  id: number;
  manufacturer: string;
  model: string;
  drive_type: string;              // e.g., "4WD", "FWD"
  battery_type: string;            // e.g., "Lithium-ion"
  battery_capacity: number;        // in kWh
  range_km: number;                // Maximum range in kilometers
  acceleration: number;            // 0 to 100 km/h in seconds
  weight_kg: number;               // Total weight in kilograms
  storage_l: number;               // Storage space in liters
  wheel_size: string;              // e.g., "18 inches"
  seating_capacity: number;        // Number of seats
  display_inch: number;            // Screen size in inches
  minimum_ground_clearance_mm: number; // Minimum ground clearance in millimeters
  width_mm: number;                // Vehicle width in millimeters
  height_mm: number;               // Vehicle height in millimeters
  length_mm: number;               // Vehicle length in millimeters
}

// DropdownProps 추가
export interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

// SpecItemProps 추가
export interface SpecItemProps {
  label: string;
  value: string | number | null;
  additionalLabel?: string;
  additionalValue?: string | number | null;
}