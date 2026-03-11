import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useAuth = () => {
  const { user, stats, token, isHydrated } = useSelector(
    (state: RootState) => state.auth,
  );

  return {
    user,
    profile: user,
    stats,
    token,
    isAuthenticated: !!user,
    isHydrated,
  };
};
