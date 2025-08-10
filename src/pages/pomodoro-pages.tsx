import { Card } from "@/components/ui/card";
import MusicPlayer from "@/modules/music-player/components";
import ExportNotesComponents from "@/modules/settings/components/export-notes";
import ImportNotesComponents from "@/modules/settings/components/import-notes";
import TimerSettingComponents from "@/modules/settings/components/timer-settings";
import TaskGroup from "@/modules/task-group/components";
import TaskModule from "@/modules/task/components";
import ThemeToggleButton from "@/modules/theme/components/theme-toggle";
import TimerModule from "@/modules/timer/components";
import React from "react";

const PomodoroPages: React.FC = () => {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-4 grid-rows-6 h-screen w-screen gap-5 p-5">
        {/* <Card className="col-span-3 row-span-1">
          <h2 className="text-lg font-bold">Navbar</h2>
        </Card> */}
        <Card className="col-span-2 row-span-2  ">
          <TimerModule />
        </Card>
        <Card className="row-span-2 col-span-1">
          <div className="px-6 flex items-center gap-2 flex-wrap">
            <ThemeToggleButton />
            <TimerSettingComponents />
            <ExportNotesComponents />
            <ImportNotesComponents />
          </div>
        </Card>
        <Card className="row-span-2">
          <MusicPlayer />
        </Card>
        <Card className="row-span-4 col-span-1">
          <TaskGroup />
        </Card>
        <div className="col-span-3 row-span-4">
          <TaskModule />
        </div>
      </div>
    </div>
  );
};

export default PomodoroPages;
// TODO:
// hover:border-accent-foreground transition-all duration-500
