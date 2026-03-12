import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api/users";

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserProfile(username),
    enabled: !!username,
  });
};
