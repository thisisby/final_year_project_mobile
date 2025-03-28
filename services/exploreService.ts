import api from "./apiBase";

export type ExploreFilters = {
  like_title: string;
  page: number;
  limit: number;
};
export const getExploreWorkouts = async (filters: ExploreFilters) => {
  const response = await api.get("/workouts", { params: filters });
  return response.data;
};
