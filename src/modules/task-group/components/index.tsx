import React from "react";
import { useTaskGroup } from "../hooks/useTaskGroup";
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
import { Plus } from "lucide-react";
import GroupList from "./list";

const TaskGroup: React.FC = () => {
  const {
    groups,
    addGroup,
    removeGroup,
    setActiveGroupId,
    activeGroupId,
    editGroup,
  } = useTaskGroup();
  const [createModal, setCreateModal] = React.useState<{
    open: boolean;
    title: string;
    id?: string;
    isEdit?: boolean;
  }>({
    open: false,
    title: "",
    id: "",
    isEdit: false,
  });

  return (
    <>
      <div className="h-full  overflow-y-auto px-6">
        <div className="flex items-center justify-between flex-row mb-4 sticky top-0 bg-card">
          <h2 className="text-lg font-bold">Notes</h2>
          <Button
            variant={"outline"}
            size={"icon"}
            className="p-2"
            onClick={() => {
              setCreateModal({ open: true, title: "" });
            }}
          >
            <Plus />
          </Button>
        </div>
        {/* short by create */}
        <GroupList
          activeGroupId={activeGroupId}
          setActiveGroupId={setActiveGroupId}
          groups={groups}
          removeGroup={removeGroup}
          editGroup={(id) => {
            const group = groups.find((g) => g.id === id);
            if (group) {
              setCreateModal({
                open: true,
                id: group.id,
                title: group.title || "",
                isEdit: true,
              });
            }
          }}
        />
      </div>

      {/* Modal Create */}
      <Dialog
        open={createModal.open}
        onOpenChange={(open) => setCreateModal({ ...createModal, open })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>
              Enter the title for your new note.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name" className="sr-only">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Note Title"
                value={createModal.title}
                onChange={(e) =>
                  setCreateModal({ ...createModal, title: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && createModal.title.trim()) {
                    if (createModal.isEdit) {
                      editGroup?.(createModal.id || "", {
                        title: createModal.title,
                      });
                    } else {
                      addGroup({ title: createModal.title });
                    }
                    setCreateModal({ open: false, title: "" });
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              onClick={() => {
                if (createModal.title.trim()) {
                  if (createModal.isEdit) {
                    editGroup?.(createModal.id || "", {
                      title: createModal.title,
                    });
                  } else {
                    addGroup({ title: createModal.title });
                  }
                  setCreateModal({ open: false, title: "" });
                }
              }}
            >
              {/* Create */}
              {createModal.isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskGroup;
