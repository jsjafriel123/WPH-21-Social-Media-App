"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setHydrated, logout } from "@/store/slices/authSlice";
import { getMe } from "@/lib/auth";
import type { AppDispatch } from "@/store";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(setHydrated());
        return;
      }

      try {
        const data = await getMe();

        dispatch(
          setAuth({
            user: data.profile,
            stats: data.stats,
            token,
          }),
        );
      } catch (error) {
        localStorage.removeItem("token");
        document.cookie = "token=; Max-Age=0; path=/";

        dispatch(logout());
      } finally {
        dispatch(setHydrated());
      }
    };

    restoreSession();
  }, [dispatch]);

  return children;
}
