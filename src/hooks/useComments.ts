import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@/lib/api/comments";

export function useComments(postId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],

    queryFn: ({ pageParam = 1 }) => getComments(postId, pageParam, 10),

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
