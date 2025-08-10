import React from "react";
import { MusicList } from "../utils/music-list";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { LofiImage } from "@/assets/images";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { MusicControls } from "./music-controls";

dayjs.extend(duration);

const MusicPlayer = () => {
  const { currentMusicId, setCurrentMusicId } = useMusicPlayer();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="px-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Music Player</h2>
        <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
          <List />
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="text-md text-center">
          {MusicList.find((music) => music.id === currentMusicId)?.title ||
            "Select a music"}
        </h3>
        <div className=" p-4 rounded-lg">
          <MusicControls />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader className="">
            <DialogTitle>Music List</DialogTitle>
            <DialogDescription>Select a music track to play.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
            {MusicList.map((music) => (
              <div
                key={music.id}
                className="cursor-pointer hover:text-primary flex items-center gap-5 hover:bg-foreground/5 duration-150 p-2 rounded-xl"
                onClick={() => setCurrentMusicId(music.id)}
              >
                <img
                  src={LofiImage}
                  alt=""
                  className="w-10 h-10 object-cover rounded-md"
                />
                {music.title}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MusicPlayer;
