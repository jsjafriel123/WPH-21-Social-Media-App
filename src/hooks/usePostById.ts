import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/lib/api/posts";
export const usePostById = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};
