import { Slider } from "@/components/ui/slider";
import { useMusicPlayerControls } from "../hooks/useMusicController";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast, Pause, Play, Repeat } from "lucide-react";

export const MusicControls: React.FC = () => {
  const {
    audioRef,
    currentMusic,
    isPlaying,
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
  } = useMusicPlayerControls();

  return (
    <div className="w-full flex flex-col items-center">
      <audio
        ref={audioRef}
        src={currentMusic?.assets}
        loop={isRepeat}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isRepeat) {
            seek(0);
          } else {
            next();
          }
        }}
      />
      <Slider
        value={[currentTime]}
        onValueChange={(value) => seek(value[0])}
        max={duration || 100}
        step={1}
      />
      <div className="text-[10px] text-foreground/50 flex flex-row justify-between w-full">
        <p>
          {dayjs(
            dayjs.duration(currentTime, "seconds").asMilliseconds()
          ).format("mm:ss")}{" "}
        </p>
        

        <p>
          {dayjs(dayjs.duration(duration, "seconds").asMilliseconds()).format(
            "mm:ss"
          )}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center w-full">
        <Button variant="ghost" size="icon" disabled className="opacity-0">
          <Repeat className="opacity-0" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prev}>
            <ChevronFirst />
          </Button>
          <Button variant="default" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="outline" size="icon" onClick={next}>
            <ChevronLast />
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleRepeat}>
          <Repeat className={isRepeat ? "text-primary" : "opacity-50"} />
        </Button>
      </div>
    </div>
  );
};
