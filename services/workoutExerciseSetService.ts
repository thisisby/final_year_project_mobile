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
