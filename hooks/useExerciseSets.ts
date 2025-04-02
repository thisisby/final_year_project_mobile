import { queryClient } from "@/app/_layout";
import {
  createExerciseSet,
  getExerciseSets,
} from "@/services/workoutExerciseSetService";
import { getWorkouts } from "@/services/workoutsService";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useExerciseSets(exerciseID: number) {
  return useQuery(["exercise-sets"], () => getExerciseSets(exerciseID), {
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("workouts error", error);
    },
  });
}

export function useCreateExerciseSet() {
  const mutation = useMutation(createExerciseSet, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exercise-sets"] });
    },
  });

  return {
    createExerciseSet: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}
