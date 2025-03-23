import { create } from "zustand";

type SessionDetailsStore = {
    startDate: Date | null;
    startTime: Date | null;
    endDate: Date | null;
    endTime: Date | null;
    notes: string;
    setStartDate: (date: Date | null) => void;
    setStartTime: (time: Date | null) => void;
    setEndDate: (date: Date | null) => void;
    setEndTime: (time: Date | null) => void;
    setNotes: (notes: string) => void;
}

export const useSessionDetailsStore = create<SessionDetailsStore>((set) => ({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    notes: "",
    setStartDate: (date) => set({ startDate: date }),
    setStartTime: (time) => set({ startTime: time }),
    setEndDate: (date) => set({ endDate: date }),
    setEndTime: (time) => set({ endTime: time }),
    setNotes: (notes) => set({ notes: notes }),
}));
    