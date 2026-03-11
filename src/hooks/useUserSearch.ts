import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/lib/api/users";

export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["userSearch", query],
    queryFn: () => searchUsers(query),

    enabled: query.length > 1, // prevent empty search
  });
}
