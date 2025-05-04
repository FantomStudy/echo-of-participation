import api from "@configs/axiosConfig";

export const fetchRoles = async () => {
  const response = await api.get("/role/all-roles");
  console.log(response.data);

  return response.data;
};
