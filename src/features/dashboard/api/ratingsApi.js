import api from "@configs/axiosConfig";

export const fetchOrganizersRating = async () => {
  const response = await api.get("/top/teacherRating");

  const data = response.data;
  return data.slice(0, 5);
};

export const fetchActivityRating = async ({
  filter = "allGroupes",
  sort,
  customRange,
}) => {
  const params = new URLSearchParams({ filter: filter });
  if (sort && sort !== "all") params.append("sort", sort);
  if (sort === "custom" && customRange)
    params.append("customRange", customRange);

  const response = await api.get(`/top/filterTop?${params.toString()}`);

  return response.data;
};
