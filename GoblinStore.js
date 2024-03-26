import { create } from 'zustand'

const useGoblinStore = create((set) => ({
  points: 500,
  apiLink:"",
  items: null,
  bloodSugarUnits: 0,
  refresh: false,
  hunger: 100,
  play: 100,
  cleanliness: 100,

  increasePoints: (number) => set((state) => ({ points: state.points + number })),
  setApiLink: (string) => set((state) => ({ apiLink: string, refresh: true })),
  setRefresh: (string) => set((state) => ({ refresh: string })),
  decreasePoints: (number) => set((state) => ({ points: state.points - number })),
  setBloodSugarUnits: (number) => set((state) => ({ bloodSugarUnits: number })),
}))

export default useGoblinStore;