import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/lib/api/posts";
export const usePostById = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
