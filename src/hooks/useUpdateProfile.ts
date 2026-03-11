import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/lib/api/users";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/navigation";

export function useUpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  //   const { token } = useAuth();
  const router = useRouter();
  const { token, stats } = useSelector((state: RootState) => state.auth);

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      dispatch(
        setAuth({
          user: data,
          stats: stats ?? undefined,
          token: token!,
        }),
      );

      toast.success("Profile updated");
      router.back();
    },
  });
}
