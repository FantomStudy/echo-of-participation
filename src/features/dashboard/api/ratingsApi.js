import api from "@configs/axiosConfig";

export const fetchOrganizersRating = async () => {
  const response = await api.get("/top/teacherRating");

  const data = response.data;
  return data.slice(0, 5);
};

export const fetchActivityRating = async (filter = "allGroupes") => {
  const response = await api.get(`/top/filterTop?filter=${filter}`);

  return response.data;
};
