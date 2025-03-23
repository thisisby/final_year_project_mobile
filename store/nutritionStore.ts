import { create } from "zustand"

type NutritionStore = {
    name: string;
    value: string;
    createdAt: Date | null;
    setName: (name: string) => void;
    setValue: (value: string) => void;
    setCreatedAt: (createdAt: Date | null) => void;
}

export const useNutritionStore = create<NutritionStore>((set) => ({
    name: "",
    value: "",
    createdAt: null,
    setName: (name) => set({ name }),
    setValue: (value) => set({ value }),
    setCreatedAt: (createdAt) => set({ createdAt }),
}));
