import { getCookie } from "@utils/cookieUtils";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const NO_AUTH_ENDPOINTS = [];

if (!API_URL) {
  throw new Error("BASE_URL не обьявлена в переменной окружения");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    const isNoAuth = NO_AUTH_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    if (accessToken && !isNoAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
