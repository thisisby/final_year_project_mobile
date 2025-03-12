import { create } from "zustand";

type ExerciseSetStore = {
  reps: number;
  weight: number;
  setReps: (reps: number) => void;
  setWeight: (weight: number) => void;
};

export const useExerciseSetStore = create<ExerciseSetStore>()((set) => ({
  reps: 0,
  weight: 0,
  setReps: (reps) => set({ reps }),
  setWeight: (weight) => set({ weight }),
}));
