export interface UserSearchItem {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
}

export interface UserSearchResponse {
  users: UserSearchItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
