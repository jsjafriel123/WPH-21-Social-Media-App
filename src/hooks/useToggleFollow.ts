import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "@/lib/api/follow";
import { UserProfile } from "@/types/user";

export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      following,
    }: {
      username: string;
      following: boolean;
    }) => {
      if (following) {
        return unfollowUser(username);
      }
      return followUser(username);
    },

    onMutate: async ({ username, following }) => {
      queryClient.setQueryData<UserProfile>(["user", username], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          isFollowing: !following,
          counts: {
            ...old.counts,
            followers: following
              ? old.counts.followers - 1
              : old.counts.followers + 1,
          },
        };
      });
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.username],
      });
    },
  });
}
