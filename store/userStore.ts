import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  id: number;
  email: string;
  username: string;
  bio: string;
}

type State = {
  user: IUser | null;
};

type Action = {
  saveUser: (user: IUser) => void;
  clearUser: () => void;
  changeUser: (user: Partial<IUser>) => void;
};

export const useUserStore = create(
  persist<State & Action>(
    (set) => ({
      user: null,
      saveUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: null }),
      changeUser: (user: Partial<IUser>) =>
        set((state) => ({ user: { ...state.user, ...user } })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
