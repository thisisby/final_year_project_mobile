import api from "./apiBase";

export type Workout = {
  id: number;
  title: string;
  description: string;
  owner_id: number;
  exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
  exercise: Exercise;
  id: number;
  main_note: string;
  secondary_note: string;
  workout_id: number;
  owner_id: number;
  exercise_id: number;
};

export type Exercise = {
  id: number;
  name: string;
};

export type CustomExercise = {
  name: string;
};

export type CreateWorkoutRequest = {
  title: string;
  description?: string;
  is_private?: boolean;
  workoutExercises: number[];
};
export const getWorkouts = async (userID: number): Promise<Workout[]> => {
  const response = await api.get(`/users/${userID}/workouts`);
  return response.data;
};

export const createWorkout = async (
  createWorkoutRequest: CreateWorkoutRequest
) => {
  const response = await api.post(`/workouts`, createWorkoutRequest);

  const requests = createWorkoutRequest.workoutExercises.map(
    (workoutExercise) =>
      api.post(`/workout-exercises`, {
        exercise_id: workoutExercise,
        workout_id: response.data.payload.id,
      })
  );

  await Promise.all(requests);

  return response.data;
};

export const deleteWorkout = async (workoutID: number) => {
  const response = await api.delete(`/workouts/${workoutID}`);

  return response.data;
};
interface PatchWorkoutParams {
  id: number;
  patchWorkout: PatchWorkout;
}
export type PatchWorkout = {
  title?: string;
  description?: string;
  is_private?: boolean;
};
export const patchWorkout = async ({
  id,
  patchWorkout,
}: PatchWorkoutParams) => {
  const response = await api.patch(`/workouts/${id}`, patchWorkout);

  return response.data;
};

export const getWorkoutByID = async (id: number) => {
  const response = await api.get(`/workouts/${id}`);
  return response.data;
};


export const copyWorkout = async (workoutID: number) => {
  const response = await api.get(`/workouts/${workoutID}/copy`);
  return response.data;
};

