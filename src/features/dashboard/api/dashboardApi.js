import api from "@configs/axiosConfig";

export const fetchDepartments = async () => {
  const response = await api.get("/department/all");

  return response.data;
};

export const fetchGroups = async () => {
  const response = await api.get("/groupe/all");

  return response.data;
};
