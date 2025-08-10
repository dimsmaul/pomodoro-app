import Badge from "@/components/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useTimer } from "../hooks/useTimer";

const TimerModule: React.FC = () => {
  const { timeLeft, status, cyclesCompleted, isPlaying, togglePlay } =
    useTimer();

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="px-6 h-full justify-between flex-col flex">
      {/* Header */}
      <div className="justify-between flex flex-row items-center">
        <h1 className="text-xl font-semibold">Timer</h1>
        <div>
          <h1 className="text-xl font-semibold">
            <Badge
              rules={[
                { status: 1, color: "#f44336", text: "Focus" },
                { status: 2, color: "#ff9800", text: "Break" },
                { status: 3, color: "#4caf50", text: "Long Break" },
              ]}
              status={status}
            />
          </h1>
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex">
          <TimeDisplay minutes={minutes} seconds={seconds} />
        </div>
        <Button variant="outline" size={"icon"} onClick={togglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-end justify-center">
        <h6>{cyclesCompleted} Pomodoro Cycle</h6>
      </div>
    </div>
  );
};

export default TimerModule;

const AnimatedDigit = ({ digit }: { digit: string }) => (
  <AnimatePresence mode="popLayout">
    <motion.span
      key={digit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="inline-block"
    >
      {digit}
    </motion.span>
  </AnimatePresence>
);

const TimeDisplay = ({
  minutes,
  seconds,
}: {
  minutes: string;
  seconds: string;
}) => (
  <div className="items-center font-bold text-9xl grid grid-cols-5">
    <AnimatedDigit digit={minutes[0]} />
    <AnimatedDigit digit={minutes[1]} />
    <p className="flex justify-center items-center mb-3">:</p>
    <AnimatedDigit digit={seconds[0]} />
    <AnimatedDigit digit={seconds[1]} />
  </div>
);
