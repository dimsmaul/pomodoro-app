// hooks/useMusicPlayerControls.ts
import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "./useMusicPlayer";
import { MusicList } from "../utils/music-list";

export function useMusicPlayerControls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const {
    currentMusicId,
    setCurrentMusicId,
    // isPlaying,
    // setIsPlaying,
    isRepeat,
    setIsRepeat,
    // currentTime,
    // setCurrentTime,
    duration,
    setDuration,
  } = useMusicPlayer();

  const currentMusic = MusicList.find((m) => m.id === currentMusicId);

  // Play/Pause effect
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentMusicId]);

  // Update time tracking
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentTime(0);
    }
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const next = () => {
    const currentIndex = MusicList.findIndex((m) => m.id === currentMusicId);
    const nextIndex = (currentIndex + 1) % MusicList.length;
    setCurrentMusicId(MusicList[nextIndex].id);
    setIsPlaying(true);
  };

  const prev = () => {
    const currentIndex = MusicList.findIndex((m) => m.id === currentMusicId);
    const prevIndex =
      (currentIndex - 1 + MusicList.length) % MusicList.length;
    setCurrentMusicId(MusicList[prevIndex].id);
    setIsPlaying(true);
  };

  return {
    audioRef,
    currentMusic,
    isPlaying,
    play,
    pause,
    togglePlay,
    isRepeat,
    toggleRepeat,
    currentTime,
    duration,
    seek,
    next,
    prev,
    handleTimeUpdate,
    handleLoadedMetadata,
  };
}
