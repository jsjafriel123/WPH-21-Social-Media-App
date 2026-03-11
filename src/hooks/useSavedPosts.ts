import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedPosts } from "@/lib/api/posts";

export function useSavedPosts() {
  return useInfiniteQuery({
    queryKey: ["savedPosts"],

    queryFn: ({ pageParam = 1 }) => getSavedPosts(pageParam, 20),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      if (page < totalPages) return page + 1;

      return undefined;
    },
  });
}
