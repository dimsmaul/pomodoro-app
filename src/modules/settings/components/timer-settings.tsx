import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTimerSettings } from "@/modules/timer/hooks/useTimerSettings";
import { Settings } from "lucide-react";
import React, { useState } from "react";

const TimerSettingComponents: React.FC = () => {
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakAfterCycles,
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setLongBreakAfterCycles,
  } = useTimerSettings();

  const [data, setData] = useState({
    focusDuration: (focusDuration || 25).toString(),
    shortBreakDuration: (shortBreakDuration || 5).toString(),
    longBreakDuration: (longBreakDuration || 15).toString(),
    longBreakAfterCycles: (longBreakAfterCycles || 4).toString(),
  });

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setFocusDuration(Number(data.focusDuration));
    setShortBreakDuration(Number(data.shortBreakDuration));
    setLongBreakDuration(Number(data.longBreakDuration));
    setLongBreakAfterCycles(Number(data.longBreakAfterCycles));
    setOpen(false);
  };

  return (
    <div>
      <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
        <Settings />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timer Settings</DialogTitle>
            <DialogDescription>
              Adjust your timer settings for focus, short breaks, and long
              breaks.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Add your settings components here */}
            <div className="flex flex-col gap-2">
              <Label>Focus Duration (minutes):</Label>
              <Input
                type="number"
                value={data.focusDuration}
                onChange={(e) =>
                  setData({ ...data, focusDuration: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Short Break Duration (minutes):</Label>
              <Input
                type="number"
                value={data.shortBreakDuration}
                onChange={(e) =>
                  setData({
                    ...data,
                    shortBreakDuration: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Long Break Duration (minutes):</Label>
              <Input
                type="number"
                value={data.longBreakDuration}
                onChange={(e) =>
                  setData({
                    ...data,
                    longBreakDuration: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Long Break After Cycles:</Label>
              <Input
                type="number"
                value={data.longBreakAfterCycles}
                onChange={(e) =>
                  setData({
                    ...data,
                    longBreakAfterCycles: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="default" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimerSettingComponents;
