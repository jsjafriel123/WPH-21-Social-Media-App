import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/lib/api/comments";
import { updatePostCaches } from "@/lib/cache/updatePostCaches";

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(postId, text),

    onMutate: async (text) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      const previousData = queryClient.getQueryData(["comments", postId]);

      const optimisticComment = {
        id: Date.now(),
        text,
        createdAt: new Date().toISOString(),
        author: {
          id: 0,
          username: "You",
          name: "You",
          avatarUrl: null,
        },
        isMine: true,
      };

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        const firstPage = old.pages[0];

        return {
          ...old,
          pages: [
            {
              ...firstPage,
              comments: [optimisticComment, ...firstPage.comments],
              pagination: {
                ...firstPage.pagination,
                total: firstPage.pagination.total + 1,
              },
            },
            ...old.pages.slice(1),
          ],
        };
      });

      // queryClient.setQueryData(["feed"], (old: any) => {
      //   if (!old) return old;

      //   return {
      //     ...old,
      //     pages: old.pages.map((page: any) => ({
      //       ...page,
      //       items: page.items.map((post: any) => {
      //         if (post.id !== postId) return post;

      //         return {
      //           ...post,
      //           commentCount: post.commentCount + 1,
      //         };
      //       }),
      //     })),
      //   };
      // });
      updatePostCaches(queryClient, postId, (post) => ({
        ...post,
        commentCount: post.commentCount + 1,
      }));
      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["comments", postId], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });
}
