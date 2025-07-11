import api from "@/configs/api";

import type { LoginCredentials } from "./types";

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
