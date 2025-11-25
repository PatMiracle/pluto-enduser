import useAuthStore from "@/store/AuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// attach token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post("/api/refresh");
        const { accessToken } = refreshRes.data;

        useAuthStore.getState().setToken(accessToken);

        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch (err) {
        useAuthStore.getState().setToken(""); // logout
      }
    }

    return Promise.reject(error);
  },
);

export default api;
