import api from "@/configs/api";

interface CurrentUserResponse {
  id: number;
  fullName: string;
  login: string;
  roleName: string;
}

export const fetchCurrentUser = async () => {
  const token = document.cookie.match(`(?:^|; )access_token=([^;]*)`); // TODO: УБРАТЬ ЛОГИКУ ТОКЕНА, БУДЕТ РЕАЛИЗОВАНО В BACKEND
  const response = await api.post<CurrentUserResponse>("/user/adminProfile", {
    access_token: token ? token[1] : null,
  });
  return response.data;
};
