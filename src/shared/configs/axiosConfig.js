import axios from "axios";
import { getCookie } from "@utils/cookieUtils";

const apiURl = import.meta.env.VITE_API_URL;
const noAuthEndpoints = [];

const api = axios.create({
  baseURL: apiURl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    const isNoAuth = noAuthEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (accessToken && !isNoAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
