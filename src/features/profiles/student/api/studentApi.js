import api from "@configs/axiosConfig";

export const fetchStudent = async (id) => {
  const response = await api.get(`/student/profile/${id}`);
  console.log(response.data);

  return response.data;
};
