import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost, unsavePost } from "@/lib/api/posts";

export function useToggleSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      isSaved,
    }: {
      postId: number;
      isSaved?: boolean;
    }) => {
      if (isSaved) {
        return unsavePost(postId);
      }

      return savePost(postId);
    },

    onMutate: async ({ postId, isSaved }) => {
      await queryClient.cancelQueries({
        queryKey: ["savedPostIds"],
      });

      const previous = queryClient.getQueryData<Set<number>>(["savedPostIds"]);

      queryClient.setQueryData(["savedPostIds"], (old?: Set<number>) => {
        const next = new Set(old ?? []);

        if (isSaved) {
          next.delete(postId);
        } else {
          next.add(postId);
        }

        return next;
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["savedPostIds"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["savedPostIds"],
      });

      queryClient.invalidateQueries({
        queryKey: ["savedPosts"],
      });
    },
  });
}
