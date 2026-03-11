import { QueryClient } from "@tanstack/react-query";

export function updatePostCaches(
  queryClient: QueryClient,
  postId: number,
  updater: (post: any) => any,
) {
  const updateQuery = (queryKey: readonly unknown[]) => {
    queryClient.setQueryData(queryKey, (old: any) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page: any) => {
          if (page.items) {
            return {
              ...page,
              items: page.items.map((post: any) =>
                post.id === postId ? updater(post) : post,
              ),
            };
          }

          if (page.posts) {
            return {
              ...page,
              posts: page.posts.map((post: any) =>
                post.id === postId ? updater(post) : post,
              ),
            };
          }

          return page;
        }),
      };
    });
  };

  // update feed
  updateQuery(["feed"]);

  // update all userPosts queries
  queryClient
    .getQueryCache()
    .getAll()
    .forEach((query) => {
      const key = query.queryKey;

      if (Array.isArray(key) && key[0] === "userPosts") {
        updateQuery(key);
      }
    });
}
