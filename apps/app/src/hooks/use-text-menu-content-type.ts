import { type Editor, useEditorState } from "@tiptap/react";

export function useTextMenuContentType(editor: Editor) {
  return useEditorState({
    editor,
    selector: (ctx) => [
      {
        icon: "paragraph",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setParagraph()
            .run(),
        id: "paragraph",
        disabled: () => !ctx.editor.can().setParagraph(),
        isActive: () =>
          ctx.editor.isActive("paragraph") &&
          !ctx.editor.isActive("orderedList") &&
          !ctx.editor.isActive("bulletList") &&
          !ctx.editor.isActive("taskList"),
        label: "Paragraph",
        type: "option",
      },
      {
        icon: "h1",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
        isActive: () => ctx.editor.isActive("heading", { level: 1 }),
        label: "Heading 1",
        type: "option",
      },
      {
        icon: "h2",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
        isActive: () => ctx.editor.isActive("heading", { level: 2 }),
        label: "Heading 2",
        type: "option",
      },
      {
        icon: "h3",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
        isActive: () => ctx.editor.isActive("heading", { level: 3 }),
        label: "Heading 3",
        type: "option",
      },
    ],
  });
}
