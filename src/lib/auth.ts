import api from "./axios";

export type RegisterPayload = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data.data;
};

export const login = async (payload: LoginPayload) => {
  const res = await api.post("/api/auth/login", payload);
  return res.data.data;
};

export const getMe = async () => {
  const res = await api.get("/api/me");
  return res.data.data;
};
