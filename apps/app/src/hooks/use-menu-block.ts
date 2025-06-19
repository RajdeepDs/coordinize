import { type Editor, useEditorState } from "@tiptap/react";
import { useMemo } from "react";

export const useTextMenuBlocks = (editor: Editor) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      paragraph: ctx.editor?.isActive("paragraph"),
      heading1: ctx.editor?.isActive("heading", { level: 1 }),
      heading2: ctx.editor?.isActive("heading", { level: 2 }),
      heading3: ctx.editor?.isActive("heading", { level: 3 }),
    }),
  });

  return useMemo(
    () => [
      {
        type: "item",
        label: "Regular text",
        icon: "regularText",
        onClick: () => {
          editor?.chain().setNode("paragraph").focus().run();
        },
        isActive: () => state.paragraph,
      },
      {
        type: "item",
        label: "Heading 1",
        icon: "heading1",
        onClick: () => {
          editor?.chain().setNode("heading", { level: 1 }).focus().run();
        },
        isActive: () => state.heading1,
      },
      {
        type: "item",
        label: "Heading 2",
        icon: "heading2",
        onClick: () => {
          editor?.chain().setNode("heading", { level: 2 }).focus().run();
        },
        isActive: () => state.heading2,
      },
      {
        type: "item",
        label: "Heading 3",
        icon: "heading3",
        onClick: () => {
          editor?.chain().setNode("heading", { level: 3 }).focus().run();
        },
        isActive: () => state.heading3,
      },
    ],
    [state, editor],
  );
};
