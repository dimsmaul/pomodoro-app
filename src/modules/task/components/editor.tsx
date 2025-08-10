import { useState } from "react";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  ParagraphNode,
  TextNode,
  type EditorState,
  type SerializedEditorState,
} from "lexical";

import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ClearFormattingToolbarPlugin } from "@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { DraggableBlockPlugin } from "@/components/editor/plugins/draggable-block-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useTaskGroup } from "@/modules/task-group/hooks/useTaskGroup";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorSerializedState,
  onChange,
  onSerializedChange,
  keys,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  keys?: string;
}) {
  return (
    <div className="bg-card w-full overflow-hidden rounded-lg border h-full">
      <LexicalComposer
        key={"editor-" + keys || "default"}
        initialConfig={{
          editable: keys ? true : false,
          ...editorConfig,
          ...{
            editorState: JSON.stringify(editorSerializedState),
          },
          // ...(editorSerializedState
          //   ? { editorState: JSON.stringify(editorSerializedState) }
          //   : {}),
          // ...(editorState ? { editorState } : {}),
          // ...(editorSerializedState
          //   ? { editorState: JSON.stringify(editorSerializedState) }
          //   : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Start typing...";

export function Plugins() {
  const { activeGroupId } = useTaskGroup();
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative h-full">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {(
          {
            // blockType
          }
        ) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
            <ClearFormattingToolbarPlugin />
            <ElementFormatToolbarPlugin />
            <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin />
            <FontFormatToolbarPlugin format="bold" />
            <FontFormatToolbarPlugin format="italic" />
            <FontFormatToolbarPlugin format="underline" />
            <FontFormatToolbarPlugin format="strikethrough" />
          </div>
        )}
      </ToolbarPlugin>
      {activeGroupId && (
        <div className="relative h-full ">
          <RichTextPlugin
            contentEditable={
              <div className="h-full w-full">
                <div className="h-full w-full" ref={onRef}>
                  <ContentEditable
                    placeholder={placeholder}
                    className="ContentEditable__root relative block h-full overflow-auto px-8 py-4 focus:outline-none"
                  />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <CheckListPlugin />
          <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          <HistoryPlugin />
        </div>
      )}
    </div>
  );
}
