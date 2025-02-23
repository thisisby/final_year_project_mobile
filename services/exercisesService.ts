import api from "./apiBase";

export type CreateCustomExercise = {
  name: string;
};

export const createCustomExercise = async (
  createCustomExercise: CreateCustomExercise
) => {
  const response = await api.post(`/exercises`, createCustomExercise);
  return response.data;
};

export const getExercises = async () => {
  const response = await api.get(`/exercises`);
  return response.data;
};

export const getMyExercises = async (userID: number) => {
  const response = await api.get(`/users/${userID}/exercises`);
  return response.data;
};
