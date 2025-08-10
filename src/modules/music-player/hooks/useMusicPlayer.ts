import { idbStorage } from "@/lib/idb-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MusicPlayerInterface {
  currentMusicId: number;
  setCurrentMusicId: (id: number) => void;
  // isPlaying: boolean;
  // setIsPlaying: (playing: boolean) => void;
  isRepeat: boolean;
  setIsRepeat: (repeat: boolean) => void;

  // currentTime: number;
  // setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  // musicList: { id: number; title: string; assets: string }[];
}

export const useMusicPlayer = create<MusicPlayerInterface>()(
  persist(
    (set) => ({
      currentMusicId: 1,
      setCurrentMusicId: (id) => set({ currentMusicId: id }),
      // isPlaying: false,
      // setIsPlaying: (playing) => set({ isPlaying: playing }),
      isRepeat: false,
      setIsRepeat: (repeat) => set({ isRepeat: repeat }),
      // currentTime: 0,
      // setCurrentTime: (time) => set({ currentTime: time }),
      duration: 0,
      setDuration: (duration) => set({ duration }),
      // musicList: [],
    }),
    {
      name: "music-player-storage", // unique name
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
