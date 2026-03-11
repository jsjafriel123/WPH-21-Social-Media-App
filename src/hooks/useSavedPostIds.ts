import { useQuery } from "@tanstack/react-query";
import { getSavedPosts } from "@/lib/api/posts";

export function useSavedPostIds() {
  return useQuery({
    queryKey: ["savedPostIds"],
    staleTime: 1000 * 60 * 10,

    queryFn: async () => {
      let page = 1;
      const limit = 20;
      let allPosts: any[] = [];

      while (true) {
        const res = await getSavedPosts(page, limit);

        allPosts = [...allPosts, ...res.posts];

        if (page >= res.pagination.totalPages) break;

        page++;
      }

      return new Set(allPosts.map((p) => p.id));
    },
  });
}
