import api from "@configs/axiosConfig";
import { getCookie } from "@utils/cookieUtils";

export const fetchCurrentUser = async () => {
  const accessToken = getCookie("access_token");
  if (!accessToken) {
    throw new Error("Не удалось найти токен");
  }

  const response = await api.post(`/user/adminProfile`, {
    access_token: accessToken,
  });

  return response.data;
};
