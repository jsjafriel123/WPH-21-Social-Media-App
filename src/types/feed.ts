export interface FeedAuthor {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
}

export interface FeedItem {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: FeedAuthor;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  savedByMe?: boolean;
}

export interface FeedResponse {
  items: FeedItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
