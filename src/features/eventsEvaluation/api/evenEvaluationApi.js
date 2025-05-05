import api from "@/shared/configs/axiosConfig";

export const fetchEventsForRate = async (userId) => {
  const response = await api.get(`/event-rating/getJournal/${userId}`);

  return response.data;
};
