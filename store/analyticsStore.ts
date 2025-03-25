import { create } from "zustand";

type AnalyticsStore = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
    selectedDate: new Date(),
    setSelectedDate: (date) => set({ selectedDate: date }),
}));