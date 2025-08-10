/**
 * @Rules
 *
 * bisa di set durasi fokus dan istirahat
 * bisa di set durasi istirahat panjang
 * system perlu menyimpan counting pomodoro cycle
 * bisa di set jumlah pomodoro cycle
 * bisa di set istirahat panjang setelah beberapa pomodoro cycle
 *
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useTimerSettings } from "./useTimerSettings";

// hooks/useTimer.ts
export const useTimer = () => {
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakAfterCycles,
    isPlaying,
    setIsPlaying,
    startTime,
    setStartTime,
    reamingTimeWhenPaused,
    setReamingTimeWhenPaused,
    countCycles,
    setCountCycles,
    status,
    setStatus,
  } = useTimerSettings();

  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Hitung durasi berdasarkan status
  const getDuration = useCallback(() => {
    if (status === 1) return focusDuration * 60;
    if (status === 2) return shortBreakDuration * 60;
    if (status === 3) return longBreakDuration * 60;
    return focusDuration * 60;
  }, [status, focusDuration, shortBreakDuration, longBreakDuration]);

  // ✅ Saat mount, sync timeLeft dari startTime / reamingTimeWhenPaused
  useEffect(() => {
    if (isPlaying && startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = getDuration() - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    } else if (reamingTimeWhenPaused > 0) {
      setTimeLeft(reamingTimeWhenPaused);
    } else {
      setTimeLeft(getDuration());
    }
  }, []);

  // Kalau setting berubah dan timer lagi stop, reset timeLeft
  useEffect(() => {
    if (!isPlaying && reamingTimeWhenPaused === 0) {
      setTimeLeft(getDuration());
    }
  }, [getDuration, isPlaying, reamingTimeWhenPaused]);

  // Start timer
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = getDuration() - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);

      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        handleSessionEnd();
      }
    }, 1000);
  }, [getDuration, startTime]);

  const handleSessionEnd = useCallback(() => {
    let nextStatus: 1 | 2 | 3 = 1;

    if (status === 1) {
      const newCycles = countCycles + 1;
      setCountCycles(newCycles);
      if (newCycles % longBreakAfterCycles === 0) {
        nextStatus = 3; // long break
      } else {
        nextStatus = 2; // short break
      }
    } else {
      nextStatus = 1; // balik ke fokus
    }

    setStatus(nextStatus);
    setReamingTimeWhenPaused(0);
    setStartTime(Date.now());
    setIsPlaying(true);
    setTimeLeft(
      nextStatus === 1
        ? focusDuration * 60
        : nextStatus === 2
        ? shortBreakDuration * 60
        : longBreakDuration * 60
    );
  }, [
    status,
    countCycles,
    longBreakAfterCycles,
    setCountCycles,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    setStatus,
    setReamingTimeWhenPaused,
    setStartTime,
    setIsPlaying,
  ]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      clearInterval(timerRef.current!);
      setIsPlaying(false);
      setReamingTimeWhenPaused(timeLeft);
    } else {
      if (reamingTimeWhenPaused > 0) {
        setStartTime(
          Date.now() - (getDuration() - reamingTimeWhenPaused) * 1000
        );
      } else {
        setStartTime(Date.now());
      }
      setIsPlaying(true);
    }
  }, [
    isPlaying,
    reamingTimeWhenPaused,
    getDuration,
    timeLeft,
    setStartTime,
    setIsPlaying,
    setReamingTimeWhenPaused,
  ]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [isPlaying, startTimer]);

  return {
    timeLeft,
    status,
    cyclesCompleted: countCycles,
    isPlaying,
    togglePlay,
  };
};
