import { type Editor, useEditorState } from "@tiptap/react";
import { useMemo } from "react";

export const useTextmenuStates = (editor: Editor) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isStrike: ctx.editor?.isActive("strike"),
      isQuote: ctx.editor?.isActive("blockquote"),
      isInlineCode: ctx.editor?.isActive("code"),
      isCodeBlock: ctx.editor?.isActive("codeBlock"),
    }),
  });

  return useMemo(
    () => ({
      isBold: state.isBold,
      isItalic: state.isItalic,
      isUnderline: state.isUnderline,
      isStrike: state.isStrike,
      isQuote: state.isQuote,
      isInlineCode: state.isInlineCode,
      isCodeBlock: state.isCodeBlock,
    }),
    [state],
  );
};
