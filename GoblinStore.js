import { create } from "zustand";
import { StateStorage, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useGoblinStore = create(
  persist(
    (set, get) => ({
      points: 20000,
      apiLink: "",
      inventory: JSON.stringify(require("./storage.json")),
      bloodSugarUnits: 0,
      hunger: 50,
      play: 50,
      cleanliness: 50,
      goblinName: "Bartholomew",
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
      cleanGoblin: () => set((state) => ({ cleanliness: 100 })),
      setDoneLoading: () => set((state) => ({ doneLoading:true })),
      setBloodSugarUnits: (number) =>
        set((state) => ({ bloodSugarUnits: number })),
      setGoblinName: (string) => set((state) => ({ goblinName: string })),
      resetProgress: () =>
        set((state) => ({
          points: 10000,
          inventory: JSON.stringify(require("./storage.json")),
          hunger: 50,
          play: 50,
          cleanliness: 50,
        })),
    }),
    {
      name: "goblin-store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        // optional
        return (state, error) => {
            state.setDoneLoading();
        };
      },
    },
    (set) => ({
      doneLoading: false,
    })
  )
);

export default useGoblinStore;
