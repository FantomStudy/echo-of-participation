import api from "@configs/axiosConfig";

export const fetchEventsForRate = async (userId) => {
  const response = await api.get(`/event-rating/getJournal/${userId}`);

  return response.data;
};

export const saveJournal = async (dataToSave) => {
  const response = await api.post("/event-rating/saveJournal", dataToSave);

  return response.data;
};
