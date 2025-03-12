import { create } from "zustand";

type Store = {
  count: boolean;
  inc: () => void;
};

export const useKeyboardStore = create<Store>()((set) => ({
  count: false,
  inc: () => set((state) => ({ count: !state.count })),
}));
