import api from "@/lib/axios";
import { UserSearchResponse } from "@/types/user";
import { ApiResponse } from "@/types/api";
import { UserProfile } from "@/types/user";
import { LikedPostsResponse } from "@/types/post";
export const getUserProfile = async (username: string) => {
  const res = await api.get<ApiResponse<UserProfile>>(`/api/users/${username}`);
  return res.data.data;
};

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

export const updateProfile = async ({
  name,
  username,
  phone,
  bio,
  avatar,
}: {
  name?: string;
  username?: string;
  phone?: string;
  bio?: string;
  avatar?: File | null;
}) => {
  const formData = new FormData();

  if (name) formData.append("name", name);
  if (username) formData.append("username", username);
  if (phone) formData.append("phone", phone);
  if (bio) formData.append("bio", bio);

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const res = await api.patch("/api/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

export const getUserLikedPosts = async ({
  username,
  page = 1,
  limit = 20,
}: {
  username: string;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get<ApiResponse<LikedPostsResponse>>(
    `/api/users/${username}/likes`,
    {
      params: { page, limit },
    },
  );

  return res.data.data;
};
