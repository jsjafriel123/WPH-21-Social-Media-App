export interface CommentAuthor {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: CommentAuthor;
  isMine?: boolean;
}

export interface CommentsResponse {
  comments: Comment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
