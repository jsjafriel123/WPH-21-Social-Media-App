import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/lib/api/comments";
import { updatePostCaches } from "@/lib/cache/updatePostCaches";

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      const previousData = queryClient.getQueryData(["comments", postId]);

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            comments: page.comments.filter((c: any) => c.id !== commentId),
            pagination: {
              ...page.pagination,
              total: page.pagination.total - 1,
            },
          })),
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
      //           commentCount: post.commentCount - 1,
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
