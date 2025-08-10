import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TaskGroupInterface } from "../hooks/useTaskGroup";

export default function GroupList({
  groups,
  activeGroupId,
  setActiveGroupId,
  removeGroup,
  editGroup,
}: {
  groups: TaskGroupInterface[];
  activeGroupId?: string;
  setActiveGroupId: (id: string) => void;
  removeGroup: (id: string) => void;
  editGroup?: (id: string) => void;
}) {
  const [openDropdownId, setOpenDropdownId] = useState<string | undefined>(
    undefined
  );

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {groups
          .sort((a, b) => {
            return (
              new Date(b.lastChanged || "").getTime() -
              new Date(a.lastChanged || "").getTime()
            );
          })
          .map((group) => (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onDoubleClick={() => {
                setOpenDropdownId(group.id);
              }}
              className={cn(
                "p-4 bg-card rounded-lg border cursor-pointer relative",
                {
                  "border-muted": group.id !== activeGroupId,
                  "border-primary/30": group.id === activeGroupId,
                }
              )}
              onClick={() => setActiveGroupId(group.id || "")}
            >
              <h3 className="text-md font-semibold line-clamp-1">
                {group.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dayjs(group.lastChanged || "").format("DD MMM YYYY HH:mm:ss")}
              </p>

              {/* Dropdown */}
              {openDropdownId === group.id && (
                <div className="absolute right-2 top-2">
                  <DropdownMenu
                    open
                    onOpenChange={() => setOpenDropdownId(undefined)}
                  >
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-muted"></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => editGroup?.(group.id || "")}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeGroup(group.id || "")}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </motion.div>
          ))}
      </AnimatePresence>
    </ul>
  );
}
