import api from "@configs/axiosConfig";

export const fetchOrganizersTop = async () => {
  const response = await api.get("/top/teacherRating");

  const data = response.data;
  return data.slice(0, 5);
};

export const fetchDiagramTop = async (filter = "allGroupes") => {
  const response = await api.get(`/top/filterTop?filter=${filter}`);

  const data = response.data;
  return data.slice(0, 10);
};
