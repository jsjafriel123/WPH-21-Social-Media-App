import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserLikedPosts } from "@/lib/api/users";

export const useUserLikedPosts = (username: string) => {
  return useInfiniteQuery({
    queryKey: ["user-liked-posts", username],

    queryFn: ({ pageParam = 1 }) =>
      getUserLikedPosts({
        username,
        page: pageParam,
        limit: 20,
      }),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },

    initialPageParam: 1,
    enabled: !!username,
  });
};
