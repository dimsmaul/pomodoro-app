import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @Rules
 *
 * - mengatur durasi fokus dan istirahat
 * - mengatur durasi istirahat panjang
 * - menyimpan jumlah siklus pomodoro yang telah dilakukan
 * - mengatur jumlah siklus pomodoro sebelum istirahat panjang
 * - mengatur durasi istirahat panjang setelah beberapa siklus pomodoro
 * - menyimpan pengaturan timer di IndexedDB
 * - mengembalikan pengaturan timer ke nilai default jika tidak ada data yang ditemukan
 * - menambahkan status(1, 2, 3) untuk menandai jenis timer (fokus, istirahat pendek, istirahat panjang)
 */

export interface TimerSettings {
  // settings
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  // pomodoroCycles: number;
  longBreakAfterCycles: number;

  setFocusDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  // setPomodoroCycles: (cycles: number) => void;
  setLongBreakAfterCycles: (cycles: number) => void;
  resetSettings: () => void;

  // state saved data

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  startTime: number; // waktu mulai timer
  setStartTime: (time: number) => void; // fungsi untuk mengatur waktu

  // lastStopTime: number; // waktu terakhir timer dihentikan
  // setLastStopTime: (time: number) => void; // fungsi untuk mengatur waktu terakhir dihentikan untuk di simpan di menit berapa dia di pause

  reamingTimeWhenPaused: number; // waktu yang tersisa ketika timer dihentikan
  setReamingTimeWhenPaused: (time: number) => void; // fungsi untuk

  status: 1 | 2 | 3; // status timer (1 = fokus, 2 = istirahat pendek, 3 = istirahat panjang)
  setStatus: (status: 1 | 2 | 3) => void; // fungsi untuk mengatur status timer

  // additional state
  countCycles: number; // jumlah siklus pomodoro yang telah dilakukan
  setCountCycles: (cycles: number) => void; // fungsi untuk mengatur jumlah siklus pomodoro yang telah dilakukan
}

export const useTimerSettings = create<TimerSettings>()(
  persist(
    (set) => ({
      focusDuration: 25, // 25 menit
      shortBreakDuration: 5, // 5 menit
      longBreakDuration: 15, // 15 menit
      // pomodoroCycles: 4, // default 4 siklus
      longBreakAfterCycles: 4, // istirahat panjang setelah 4 siklus

      setFocusDuration: (duration: number) => set({ focusDuration: duration }),
      setShortBreakDuration: (duration: number) =>
        set({ shortBreakDuration: duration }),
      setLongBreakDuration: (duration: number) =>
        set({ longBreakDuration: duration }),
      // setPomodoroCycles: (cycles: number) => set({ pomodoroCycles: cycles }),
      setLongBreakAfterCycles: (cycles: number) =>
        set({ longBreakAfterCycles: cycles }),
      resetSettings: () =>
        set({
          focusDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          // pomodoroCycles: 4,
          longBreakAfterCycles: 4,
        }),

      isPlaying: false,
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
      startTime: 0,
      setStartTime: (time: number) => set({ startTime: time }),
      // lastStopTime: 0,
      // setLastStopTime: (time: number) => set({ lastStopTime: time }),
      reamingTimeWhenPaused: 0,
      setReamingTimeWhenPaused: (time: number) =>
        set({ reamingTimeWhenPaused: time }),
      status: 1, // default status fokus
      setStatus: (status: 1 | 2 | 3) => set({ status }), // fungsi untuk mengatur status timer
      countCycles: 0, // jumlah siklus pomodoro yang telah dilakukan
      setCountCycles: (cycles: number) => set({ countCycles: cycles }),
    }),
    {
      name: "timer-settings", // key untuk IndexedDB
      storage: createJSONStorage(() => localStorage), // gunakan idbStorage yang sudah dibuat
    }
  )
);
