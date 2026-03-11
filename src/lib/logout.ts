import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

export const forceLogout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; Max-Age=0; path=/";

  store.dispatch(logout());

  window.location.href = "/login";
};
