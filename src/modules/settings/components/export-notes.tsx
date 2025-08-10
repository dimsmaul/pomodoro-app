import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTaskGroup } from "@/modules/task-group/hooks/useTaskGroup";
import { FileDown } from "lucide-react";
import React from "react";
import { ulid } from "ulid";

const ExportNotesComponents: React.FC = () => {
  const { groups } = useTaskGroup();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
        <FileDown />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Notes</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row items-center  justify-between ">
            <p>Export your notes in json formats.</p>
            <Button
              variant={"outline"}
              onClick={() => {
                const json = JSON.stringify(groups);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${ulid()}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExportNotesComponents;
