import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "@/lib/api/posts";
import { updatePostCaches } from "@/lib/cache/updatePostCaches";
export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      liked,
    }: {
      postId: number;
      liked: boolean;
    }) => {
      if (liked) {
        return unlikePost(postId);
      }
      return likePost(postId);
    },

    onMutate: async ({ postId, liked }) => {
      // await queryClient.cancelQueries({ queryKey: ["feed"] });

      // const previousData = queryClient.getQueryData(["feed"]);

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
      //           likedByMe: !liked,
      //           likeCount: liked ? post.likeCount - 1 : post.likeCount + 1,
      //         };
      //       }),
      //     })),
      //   };
      // });

      // return { previousData };
      updatePostCaches(queryClient, postId, (post) => ({
        ...post,
        likedByMe: !post.likedByMe,
        likeCount: post.likedByMe ? post.likeCount - 1 : post.likeCount + 1,
      }));
    },

    // onError: (_, __, context) => {
    //   if (context?.previousData) {
    //     queryClient.setQueryData(["feed"], context.previousData);
    //   }
    // },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}
