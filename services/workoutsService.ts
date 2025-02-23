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
