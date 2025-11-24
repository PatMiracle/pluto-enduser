import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  withCredentials: true,
});

// store access token in headers for every request
api.interceptors.request.use(async (config) => {
  const token = useAuthContext();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle token refresh on 401 Unauthorized responses
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await fetch("/api/refresh");
        const { accessToken } = await refreshRes.json();
        useAuthContext().setAccessToken(accessToken);

        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(error.config);
      } catch {
        useAuthContext().setAccessToken("");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
