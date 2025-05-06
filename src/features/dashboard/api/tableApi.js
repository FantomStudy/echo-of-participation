import api from "@configs/axiosConfig";

import {
  extractEntities,
  extractEvents,
  extractTraffic,
} from "../utils/extractUtils";

export const fetchTableData = async ({
  pageParam = 1,
  limit = 400,
  type,
  id,
  sort,
  customRange,
}) => {
  let response;

  if (!type) {
    response = await api.get(
      `/event-journal/allStudents?page=${pageParam}&limit=${limit}`,
    );
  } else {
    const params = new URLSearchParams();
    if (id) params.append("id", id);
    if (sort && sort !== "all") params.append("sort", sort);
    if (sort === "custom" && customRange)
      params.append("customRange", customRange);

    response = await api.get(`/filters/${type}?${params.toString()}`);
  }

  const data = response.data;
  const dataArray = Array.isArray(data) ? data : [data];

  const events = extractEvents(dataArray);
  const entities = extractEntities(dataArray);
  const traffic = extractTraffic(dataArray);

  return { events, entities, traffic };
};

export const saveTraffic = async (dataToSave) => {
  const response = await api.post("/event-journal/save-journal", dataToSave);

  return response;
};

//TODO ВРЕМЕННО ЗАМЕНЕНО НА ПОДСЧЁТ НА ФРОНТЕ
export const fetchTotalEventPoints = async () => {};
