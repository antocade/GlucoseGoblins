import { create } from "zustand";
import { StateStorage, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
const useGoblinStore = create(
  persist(
    (set, get) => ({
      points: 500,
      apiLink: "",
      inventory: JSON.stringify(require("./storage.json")),
      bloodSugarUnits: 0,
      hunger: 100,
      play: 100,
      cleanliness: 100,

      increasePoints: (number) =>
        set((state) => ({ points: state.points + number })),
      setApiLink: (string) =>
        set((state) => ({ apiLink: string, refresh: true })),
      setInventory: (string) => set((state) => ({ inventory: string })),
      decreasePoints: (number) =>
        set((state) => ({ points: state.points - number })),
      decreaseHunger: (number) =>
        set((state) => ({ hunger: state.hunger - number })),
      increaseHunger: (number) =>
        set((state) => ({ hunger: state.hunger + number })),
      decreasePlay: (number) => set((state) => ({ play: state.play - number })),
      increasePlay: (number) => set((state) => ({ play: state.play + number })),
      decreaseCleanliness: (number) =>
        set((state) => ({ cleanliness: state.cleanliness - number })),
      increaseCleanliness: (number) =>
        set((state) => ({ Cleanliness: state.Cleanliness + number })),
      setBloodSugarUnits: (number) =>
        set((state) => ({ bloodSugarUnits: number })),
    }),
    {
      name: "goblin-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGoblinStore;
