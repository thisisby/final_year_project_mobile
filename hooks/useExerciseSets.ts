import { getExerciseSets } from "@/services/workoutExerciseSetService";
import { getWorkouts } from "@/services/workoutsService";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export function useExerciseSets(exerciseID: number) {
  return useQuery(["exercise-sets"], () => getExerciseSets(exerciseID), {
    onSuccess: (data) => {
      console.log("exercise Sets", data);
    },
    onError: (error) => {
      console.error("workouts error", error);
    },
  });
}
