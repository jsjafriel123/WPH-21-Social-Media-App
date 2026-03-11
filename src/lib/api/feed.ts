import api from "../axios";
import { FeedResponse } from "@/types/feed";

export const getFeed = async (
  page: number = 1,
  limit: number = 20,
): Promise<FeedResponse> => {
  const res = await api.get("/api/feed", {
    params: {
      page,
      limit,
    },
  });

  return res.data.data;
};
