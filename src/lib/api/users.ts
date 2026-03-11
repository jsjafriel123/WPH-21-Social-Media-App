import api from "@/lib/axios";
import { UserSearchResponse } from "@/types/user";

export const searchUsers = async (
  query: string,
  page = 1,
  limit = 20,
): Promise<UserSearchResponse> => {
  const res = await api.get("/api/users/search", {
    params: {
      q: query,
      page,
      limit,
    },
  });

  return res.data.data;
};

export const getUserPosts = async (username: string, page = 1, limit = 20) => {
  const res = await api.get(`/api/users/${username}/posts`, {
    params: { page, limit },
  });

  return res.data.data;
};
