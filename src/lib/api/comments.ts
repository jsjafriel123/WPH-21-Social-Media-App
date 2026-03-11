import api from "@/lib/axios";
import { CommentsResponse } from "@/types/comment";

export const getComments = async (
  postId: number,
  page = 1,
  limit = 10,
): Promise<CommentsResponse> => {
  const res = await api.get(`/api/posts/${postId}/comments`, {
    params: { page, limit },
  });

  return res.data.data;
};

export const createComment = async (postId: number, text: string) => {
  const res = await api.post(`/api/posts/${postId}/comments`, {
    text,
  });

  return res.data.data;
};

export const deleteComment = async (commentId: number) => {
  const res = await api.delete(`/api/comments/${commentId}`);
  return res.data.data;
};
