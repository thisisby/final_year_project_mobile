import { queryClient } from "@/app/_layout";
import {
  createWorkout,
  deleteWorkout,
  getWorkoutByID,
  getWorkouts,
  patchWorkout,
  copyWorkout,
} from "@/services/workoutsService";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWorkouts() {
  const { user } = useUserStore();

  return useQuery(["workouts"], () => getWorkouts(user?.id ?? 0), {
    onSuccess: (data) => {
      console.log("workouts", data);
    },
    onError: (error) => {
      console.error("workouts error", error);
    },
  });
}

export function useCreateWorkout() {
  const mutation = useMutation(createWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("workout created", data);
    },
    onError: (error) => {
      console.error("workout create error", error);
    },
  });

  return {
    createWorkout: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function useDeleteWorkout() {
  const mutation = useMutation(deleteWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("workout deleted", data);
    },
    onError: (error) => {
      console.error("workout delete error", error);
    },
  });

  return {
    deleteWorkout: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function usePatchWorkout() {
  const mutation = useMutation(patchWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("workout patched", data);
    },
    onError: (error) => {
      console.error("workout patch error", error);
    },
  });

  return {
    patchWorkout: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function useCopyWorkout() {
  const mutation = useMutation(copyWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["explore-workout-by-id"] });
      console.log("workout copied", data);
    },
    onError: (error) => {
      console.error("workout copy error", error);
    },
  });

  return {
    copyWorkout: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
}

export function useGetWorkoutByID(id: number) {
  return useQuery({
    queryKey: ["explore-workout-by-id", id],
    queryFn: () => getWorkoutByID(id),
    onSuccess: (data) => {
      console.log("explore workout by id", data);
    },
    onError: (error) => {
      console.error("explore workout by id error", error);
    },
  });
}

