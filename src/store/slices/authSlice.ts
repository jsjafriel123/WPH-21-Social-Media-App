import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

type Stats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};

type AuthState = {
  user: User | null;
  stats: Stats | null;
  token: string | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  stats: null,
  token: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{
        user: User | null;
        stats?: Stats;
        token: string;
      }>,
    ) {
      state.user = action.payload.user;
      state.stats = action.payload.stats ?? null;
      state.token = action.payload.token;
    },

    logout(state) {
      state.user = null;
      state.stats = null;
      state.token = null;

      localStorage.removeItem("token");
      document.cookie = "token=; Max-Age=0; path=/";
    },

    setHydrated(state) {
      state.isHydrated = true;
    },
  },
});

export const { setAuth, logout, setHydrated } = authSlice.actions;

export default authSlice.reducer;
