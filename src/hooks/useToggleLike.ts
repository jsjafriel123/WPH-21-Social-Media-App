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
        console.log("unlikePost", liked);
        return unlikePost(postId);
      }
      console.log("likePost", liked);
      return likePost(postId);
    },

    onMutate: async ({ postId, liked }) => {
      console.log("liked:", liked);
      updatePostCaches(queryClient, postId, (post) => ({
        ...post,
        likedByMe: !liked,
        likeCount: liked ? post.likeCount - 1 : post.likeCount + 1,
      }));
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      // queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
  });
}
