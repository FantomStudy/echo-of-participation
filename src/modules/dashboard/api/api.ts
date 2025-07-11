import api from "@/configs/api";

import type { OrganizersRatingResponse } from "../dashboard";

export const fetchOrganizersRating = async () => {
  const response =
    await api.get<OrganizersRatingResponse>("/top/teacherRating");
  return response.data.slice(0, 5);
};

export const fetchTable = async () => {
  const response = await api.get("/event-journal/allStudents?page=1&limit=400");
};
