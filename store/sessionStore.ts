import { create } from "zustand";

type SessionStore = {
  isActive: boolean;
  startTime: Date | null;
  endTime: Date | null;
  elapsedSeconds: number;
  activityID: number;
  startSession: (activityID?: number) => void;
  stopSession: () => void;
  updateElapsedTime: () => void;
  resetSession: () => void;
  formatTime: () => string;
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  isActive: false,
  startTime: null,
  endTime: null,
  elapsedSeconds: 0,
  activityID: 0,
  
  startSession: (activityID = 0) => set({ 
    isActive: true, 
    startTime: new Date(),
    activityID,
    endTime: null,
  }),
  
  stopSession: () => set((state) => ({ 
    isActive: false,
    endTime: new Date(),
  })),
  
  updateElapsedTime: () => set((state) => {
    if (!state.isActive || !state.startTime) return state;
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - state.startTime.getTime()) / 1000);
    
    return { elapsedSeconds: diffInSeconds };
  }),
  
  resetSession: () => set({
    isActive: false,
    startTime: null,
    endTime: null,
    elapsedSeconds: 0,
  }),
  
  formatTime: () => {
    const { elapsedSeconds } = get();
    
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    
    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 && hours > 0 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }
}));