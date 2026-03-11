import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/lib/api/posts";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: createPost,

    onMutate: async ({ image, caption }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const previousFeed = queryClient.getQueryData(["feed"]);

      const optimisticPost = {
        id: Date.now(),
        imageUrl: URL.createObjectURL(image),
        caption,
        createdAt: new Date().toISOString(),
        author: {
          id: user?.id,
          username: user?.username,
          name: user?.name,
          avatarUrl: user?.avatarUrl ?? null,
        },
        likeCount: 0,
        commentCount: 0,
        likedByMe: false,
      };

      queryClient.setQueryData(["feed"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              items: [optimisticPost, ...old.pages[0].items],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousFeed };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }

      toast.error("Failed to create post");
    },

    onSuccess: () => {
      toast.success("Post created");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}
