"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AppDispatch } from "@/store";

export const useLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/`;

      dispatch(
        setAuth({
          user: data.user,
          token: data.token,
        }),
      );

      toast.success("Login successful");
      router.push("/");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};
