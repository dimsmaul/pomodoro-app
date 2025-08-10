// stores/useAppStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage } from "../lib/idb-storage";

interface AppState {
  count: number;
  increase: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "app-state", // ini jadi key di IndexedDB
      storage: createJSONStorage(
        () => idbStorage // gunakan idbStorage yang sudah dibuat
      ), // custom storage pakai IndexedDB
    }
  )
);
