import type { MenuITems } from "@/components/editor-bubble-menu/bubble-menu-dropdown";
import { type Editor, useEditorState } from "@tiptap/react";

export const useTextMenuBlocks = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): MenuITems[] => [
      {
        type: "item",
        label: "Regular text",
        icon: "regularText",
        onClick: () => {
          ctx.editor.chain().setNode("paragraph").focus().run();
        },
        isActive: () => ctx.editor?.isActive("paragraph"),
      },
      {
        type: "item",
        label: "Heading 1",
        icon: "heading1",
        onClick: () => {
          ctx.editor.chain().setNode("heading", { level: 1 }).focus().run();
        },
        isActive: () => ctx.editor?.isActive("heading", { level: 1 }),
      },
      {
        type: "item",
        label: "Heading 2",
        icon: "heading2",
        onClick: () => {
          ctx.editor.chain().setNode("heading", { level: 2 }).focus().run();
        },
        isActive: () => ctx.editor?.isActive("heading", { level: 2 }),
      },
      {
        type: "item",
        label: "Heading 3",
        icon: "heading3",
        onClick: () => {
          ctx.editor.chain().setNode("heading", { level: 3 }).focus().run();
        },
        isActive: () => ctx.editor?.isActive("heading", { level: 3 }),
      },
    ],
  });
};
