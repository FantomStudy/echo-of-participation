import { getCookie } from "@utils/cookieUtils";
import api from "@configs/axiosConfig";

export const loginUserApi = async ({ login, password }) => {
  try {
    const response = await api.post(
      "/auth/login",
      { login, password },
      { withCredentials: true }
    );

    const accessToken = getCookie("access_token");

    return { data: response.data, error: null, accessToken };
  } catch (err) {
    console.error("Ошибка авторизации:", err);
    return {
      error: err.response?.data?.message || err.message || "Ошибка при входе",
    };
  }
};
