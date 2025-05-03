import api from "@configs/axiosConfig";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials, {
    withCredentials: true,
  });

  return response.data;
};
