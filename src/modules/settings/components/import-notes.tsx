import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTaskGroup } from "@/modules/task-group/hooks/useTaskGroup";
import { FileInput } from "lucide-react";
import React from "react";

const ImportNotesComponents: React.FC = () => {
  const { addGroup } = useTaskGroup();
  const [file, setFile] = React.useState<File | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Assuming json is an array of task groups
        json.forEach((group: any) => {
          addGroup(group);
        });
        setOpen(false);
      } catch (error) {
        console.error("Invalid JSON file", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <Button variant={"outline"} size={"icon"} onClick={() => setOpen(true)}>
        <FileInput />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Notes</DialogTitle>
            <DialogDescription>
              Import your notes in json formats
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 ">
            <Input
              id="picture"
              type="file"
              accept=".json"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />

            <div className="flex flex-row items-end justify-end">
              <Button
                variant={"outline"}
                onClick={() => {
                  if (file) {
                    handleFileUpload(file);
                  } else {
                    console.error("No file selected");
                  }
                }}
              >
                Import
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportNotesComponents;
