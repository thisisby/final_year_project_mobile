import api from "./apiBase";

export const deleteWorkoutExercise = async (workoutExerciseID: number) => {
  const response = await api.delete(`/workout-exercises/${workoutExerciseID}`);
  return response.data;
};

export const patchWorkoutExercise = async ({
  id,
  patchWorkoutExercise,
}: PatchWorkoutExerciseParams) => {
  const response = await api.patch(
    `/workout-exercises/${id}`,
    patchWorkoutExercise
  );
  return response.data;
};

interface PatchWorkoutExerciseParams {
  id: number;
  patchWorkoutExercise: PatchWorkoutExercise;
}
export type PatchWorkoutExercise = {
  name?: string;
  main_note?: string;
  secondary_note?: string;
};

export const addWorkoutExercise = async (
  workoutExercise: AddWorkoutExercise
) => {
  const response = await api.post(`/workout-exercises`, workoutExercise);
  return response.data;
};

export type AddWorkoutExercise = {
  exercise_id: number;
  workout_id: number;
};

export const getWorkoutExerciseByID = async (id: number) => {
  const response = await api.get(`/workout-exercises/${id}`);
  return response.data;
};
