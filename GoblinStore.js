import { create } from 'zustand'

const useGoblinStore = create((set) => ({
  points: 0,
  apiLink:"",
  items: null,

  increasePoints: (number) => set((state) => ({ points: state.points + number })),
  setApiLink: (string) => set((state) => ({ apiLink: string })),
  decreasePoints: (number) => set((state) => ({ points: state.points - number })),
}))