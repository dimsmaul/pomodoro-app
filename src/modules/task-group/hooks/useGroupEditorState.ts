// hooks/useGroupEditorState.ts
import { useState, useCallback } from "react";
import type { SerializedEditorState } from "lexical";

export function useGroupEditorState<T extends string | number>() {
  const [editorStates, setEditorStates] = useState<
    Record<T, SerializedEditorState | undefined>
  >({} as Record<T, SerializedEditorState | undefined>);

  const getEditorState = useCallback(
    (id: T) => editorStates[id],
    [editorStates]
  );

  const setEditorStateForGroup = useCallback(
    (id: T, state: SerializedEditorState) => {
      setEditorStates((prev) => ({ ...prev, [id]: state }));
    },
    []
  );

  return { getEditorState, setEditorStateForGroup };
}
