import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/lib/api/users";

export function useUserSearch(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  return useQuery({
    queryKey: ["userSearch", normalizedQuery],
    queryFn: () => searchUsers(normalizedQuery),

    enabled: normalizedQuery.length > 1, // prevent empty search

    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    gcTime: 1000 * 60 * 10,

    placeholderData: (prev) => prev,
    select: (data) => data.users,
  });
}
