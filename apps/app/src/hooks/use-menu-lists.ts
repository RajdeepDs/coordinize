import type { MenuITems } from "@/components/editor-bubble-menu/bubble-menu-dropdown";
import { type Editor, useEditorState } from "@tiptap/react";

export const useTextMenuLists = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): MenuITems[] => [
      {
        type: "item",
        label: "List",
        icon: "bulletList",
        onClick: () => {
          ctx.editor
            ?.chain()
            .focus()
            .toggleList("bulletList", "listItem")
            .run();
        },
        isActive: () => ctx.editor?.isActive("bulletList"),
      },
      {
        type: "item",
        label: "Numbered list",
        icon: "numberedList",
        onClick: () => {
          ctx.editor
            ?.chain()
            .focus()
            .toggleList("orderedList", "listItem")
            .run();
        },
        isActive: () => ctx.editor?.isActive("orderedList"),
      },
      {
        type: "item",
        label: "Checklist",
        icon: "checkList",
        onClick: () => {
          ctx.editor?.chain().focus().toggleList("taskList", "taskItem").run();
        },
        isActive: () => ctx.editor?.isActive("taskList"),
      },
    ],
  });
};
