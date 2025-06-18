import { type Editor, useEditorState } from "@tiptap/react";

export const useTextmenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold"),
        isItalic: ctx.editor?.isActive("italic"),
        isUnderline: ctx.editor?.isActive("underline"),
        isStrike: ctx.editor?.isActive("strike"),
        isQuote: ctx.editor?.isActive("blockquote"),
        isInlineCode: ctx.editor?.isActive("code"),
        isCodeBlock: ctx.editor?.isActive("codeBlock"),
      };
    },
  });

  return {
    ...states,
  };
};
