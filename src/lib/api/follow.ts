import api from "../axios";

export const followUser = async (username: string) => {
  const res = await api.post(`/api/follow/${username}`);
  return res.data.data;
};

export const unfollowUser = async (username: string) => {
  const res = await api.delete(`/api/follow/${username}`);
  return res.data.data;
};
