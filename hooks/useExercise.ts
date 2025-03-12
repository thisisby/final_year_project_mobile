import { queryClient } from "@/app/_layout";
import {
  createCustomExercise,
  getExercises,
  getMyExercises,
} from "@/services/exercisesService";
import { createWorkout, getWorkouts } from "@/services/workoutsService";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateCustomExercise() {
  const mutation = useMutation(createCustomExercise, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-exercises", "exercises", "workouts"] });
      console.log("exercise Created", data);
    },
    onError: (error) => {
      console.error("exercise create error", error);
    },
  });

  return mutation.mutateAsync; // This makes sure you can await it
}

export function useExercises() {
  return useQuery(["exercises"], getExercises, {
    onSuccess: (data) => {
      console.log("exercises", data);
    },
    onError: (error) => {
      console.error("exercises error", error);
    },
  });
}

export function useMyExercises() {
  const { user } = useUserStore();

  return useQuery(["my-exercises"], () => getMyExercises(user?.id ?? 0), {
    onSuccess: (data) => {
      console.log("my exercises", data);
    },
    onError: (error) => {
      console.error("my exercises error", error);
    },
  });
}
