import axios from "axios";
import { forceLogout } from "./logout";

const api = axios.create({
  baseURL: "https://be-social-media-api-production.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      forceLogout();
    }

    return Promise.reject(error);
  },
);
export default api;
