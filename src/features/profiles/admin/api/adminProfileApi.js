import api from "@configs/axiosConfig";

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

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/event/${id}`, {
      withCredentials: true,
    });

    if (response.statusText !== "OK") {
      throw new Error("Ошибка при удалении мероприятия");
    }

    console.log("УДАЛЕНО");
  } catch (err) {
    console.error("Ошибка удаления мероприятия:", err);
  }
};

export const fetchAllEvents = async () => {
  const response = await api.get("/event/allEvents");

  if (response.statusText !== "OK") {
    throw new Error("Ошибка при загрузке мероприятий");
  }

  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get("/user/allUsers");

  if (response.statusText !== "OK") {
    throw new Error("Ошибка при загрузке руководителей");
  }

  return response.data;
};
