import axios from "axios";
import { clearAuth, setAccessToken } from "../../features/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function setupAxiosInterceptors(store) {
  api.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest?._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const response = await authApi.post("/auth/refresh");

        const newAccessToken = response.data.data.accessToken;

        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAuth());

        return Promise.reject(refreshError);
      }
    },
  );
}

export { api, authApi };

export default api;
