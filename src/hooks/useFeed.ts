import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "@/lib/api/feed";

export function useFeed() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeed(1, 20),
  });
}

export function useFeeds() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam = 1 }) => getFeed(pageParam, 20),

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
