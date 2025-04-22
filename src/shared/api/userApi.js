import api from "@configs/axiosConfig";
import { getCookie } from "@utils/cookieUtils";

export const fetchUser = async () => {
  const accessToken = getCookie("access_token");
  if (!accessToken) {
    throw new Error("Токен отсутствует");
  }

  const response = await api.post(`/user/profile`, {
    access_token: accessToken,
  });

  return response.data;
};
