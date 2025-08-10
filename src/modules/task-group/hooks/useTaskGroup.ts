import { idbStorage } from "@/lib/idb-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ulid } from "ulid";
import type { SerializedEditorState } from "lexical";

export interface TaskGroupInterface {
  id?: string;
  title?: string;
  lastChanged?: string;
  tasks?: SerializedEditorState;
}

export interface TaskGroupState {
  // Active group ID
  activeGroupId?: string;
  setActiveGroupId: (id?: string) => void;

  // Task groups management
  groups: TaskGroupInterface[];
  addGroup: (group: TaskGroupInterface) => void;
  editGroup?: (id: string, updatedGroup: Partial<TaskGroupInterface>) => void;
  removeGroup: (id: string) => void;
}

export const useTaskGroup = create<TaskGroupState>()(
  persist(
    (set) => ({
      // Active group ID
      activeGroupId: undefined,
      setActiveGroupId: (id) => set({ activeGroupId: id }),

      // Task groups
      groups: [],
      addGroup: (group) => {
        group.id = ulid(); // Generate a unique ID for the group
        group.lastChanged = new Date().toISOString(); // Set the last changed time
        set((state) => ({ groups: [...state.groups, group] }));
      },
      editGroup: (id, updatedGroup) => {
        updatedGroup.lastChanged = new Date().toISOString(); // Update the last changed time
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === id ? { ...group, ...updatedGroup } : group
          ),
        }));
      },
      removeGroup: (id) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
          activeGroupId: undefined,
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
