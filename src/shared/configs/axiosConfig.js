import axios from "axios";
import { getCookie } from "@utils/cookieUtils";

const noAuthEndpoints = [];

const api = axios.create({
  baseURL: "http://localhost:3000",
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
