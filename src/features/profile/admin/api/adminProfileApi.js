import api from "@configs/axiosConfig";

export const fetchAllEvents = async () => {
  const response = await api.get("/event/allEvents");

  if (response.statusText !== "OK") {
    throw new Error("Ошибка при загрузке мероприятий");
  }

  return response.data;
};

export const addEvent = async (eventData) => {
  try {
    const response = await api.post("/event/addEvent", eventData, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    console.error("Ошибка при добавлении мероприятия:", err);
  }
};
