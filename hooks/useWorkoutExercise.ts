import { queryClient } from "@/app/_layout";
import {
  addWorkoutExercise,
  deleteWorkoutExercise,
  getWorkoutExerciseByID,
  patchWorkoutExercise,
} from "@/services/workoutExerciseService";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useDeleteWorkoutExercise() {
  const mutation = useMutation(deleteWorkoutExercise, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["explore-workout-by-id"] });
      console.log("workout exercise deleted", data);
    },
  });

  return {
    deleteWorkoutExercise: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function usePatchWorkoutExercise() {
  const mutation = useMutation(patchWorkoutExercise, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["explore-workout-by-id"] });

      console.log("workout exercise patched", data);
    },
  });

  return {
    patchWorkoutExercise: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function useAddWorkoutExercise() {
  const mutation = useMutation(addWorkoutExercise, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["explore-workout-by-id"] });
      console.log("workout exercise added", data);
    },
  });

  return {
    addWorkoutExercise: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function useGetWorkoutExerciseByID(id: number) {
  return useQuery(["workout-exercise", id], () => getWorkoutExerciseByID(id), {
    onSuccess: (data) => {
      console.log("workout exercise", data);
    },
    onError: (error) => {
      console.error("workout exercise error", error);
    },
  });
}
