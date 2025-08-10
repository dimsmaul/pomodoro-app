import { useTaskGroup } from "@/modules/task-group/hooks/useTaskGroup";
import { useGroupEditorState } from "@/modules/task-group/hooks/useGroupEditorState";
import { Editor } from "./editor";

const TaskModule = () => {
  const { groups, editGroup, activeGroupId } = useTaskGroup();
  const { getEditorState, setEditorStateForGroup } = useGroupEditorState();
  const currentState = activeGroupId
    ? getEditorState(activeGroupId)
    : undefined;

  return (
    <div className="h-full w-full my-lexical">
      {
        <Editor
          key={activeGroupId}
          keys={activeGroupId}
          editorSerializedState={
            currentState ||
            (groups.find((g) => g.id === activeGroupId)?.tasks as any)
          }
          onSerializedChange={(value) => {
            if (activeGroupId) {
              setEditorStateForGroup(activeGroupId, value);
              editGroup?.(activeGroupId, { tasks: value });
            }
          }}
        />
      }
    </div>
  );
};

export default TaskModule;
