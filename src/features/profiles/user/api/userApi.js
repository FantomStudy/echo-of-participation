import api from "@configs/axiosConfig";

export const fetchUserById = async (id) => {
  const response = await api.get(`/user/userProfile/${id}`);

  return response.data;
};
