import api from "./apiBase";

export type ExerciseSet = {
  id: number;
  reps: number;
  weight: number;
  notes: string;
  workout_exercise_id: number;
  owner_id: number;
  created_at: string;
};

export const getExerciseSets = async (
  exerciseID: number
): Promise<ExerciseSet[]> => {
  const response = await api.get(
    `/workout-exercises/${exerciseID}/exercise-sets`
  );
  return response.data;
};

export const createExerciseSet = async (exerciseSet: CreateExerciseSet) => {
  const response = await api.post(`/exercise-sets`, exerciseSet);
  return response.data;
};

export type CreateExerciseSet = {
  reps: number;
  weight: number;
  workout_exercise_id: number;
};
