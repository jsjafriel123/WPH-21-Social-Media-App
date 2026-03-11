import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/lib/api/users";

export function useUserPosts(username: string) {
  return useInfiniteQuery({
    queryKey: ["userPosts", username],

    queryFn: ({ pageParam = 1 }) => getUserPosts(username, pageParam, 20),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });
}
