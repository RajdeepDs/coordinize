"use client";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";

import type { Editor } from "@tiptap/core";

import { useHasMounted } from "@/hooks/use-mounted";
import {
  type BlurAtTopOptions,
  focusAtStartWithNewline,
  getMarkdownExtensions,
} from "@coordinize/editor";
import { cn } from "@coordinize/ui/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { EditorBubbleMenu } from "../editor-bubble-menu";

// Sometimes we conditionally change the ID of the editor, e.g. when the fixed comment bar goes into 'reply mode'.
// TipTap doesn't support changing the editor ID, so we focus the editor by querying its container, then the editor inside.
export function focusEditor(editorId: string) {
  const el = document
    .getElementById(editorId)
    ?.querySelector("div[contenteditable]") as HTMLElement | null;

  el?.focus?.();
}

export const EMPTY_HTML = "<p></p>";

type Props = {
  disabled?: boolean;
  placeholder?: string;
  content?: string;
  onClick?: () => void;
  onChangeDebounced?: (html: string) => void;
  onChangeDebounceMs?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onEmptyDidChange?: (isEmpty: boolean) => void;
  autoFocus?: boolean | "end" | "start";
  isSubmitted?: boolean;
  minHeight?: string;
  maxHeight?: string;
  textSize?: "sm" | "base";
  id?: string;
  containerClasses?: string;
  enableInlineLinks?: boolean;
  enableSyntaxHighlighting?: boolean;
  appendBubbleMenuTo?: () => HTMLElement | null;
  onBlurAtTop?: BlurAtTopOptions["onBlur"];
  disableSlashCommand?: boolean;
  disableMentions?: boolean;
  disableReactions?: boolean;
};

export interface MarkdownEditorRef {
  getHTML(): string;
  setHTML(html: string): void;
  isEmpty(): boolean;
  clearAndBlur(): void;
  insertReaction: Editor["commands"]["insertReaction"];
  focus(pos?: "start" | "end" | "restore" | "start-newline"): void;
  isFocused(): boolean;
}

const MarkdownEditor = forwardRef<MarkdownEditorRef, Props>((props, ref) => {
  const {
    id = "",
    content,
    placeholder,
    onClick,
    onChangeDebounced,
    onChangeDebounceMs = 300,
    onEmptyDidChange,
    autoFocus = false,
    isSubmitted,
    minHeight = "48px",
    maxHeight,
    textSize = "base",
    containerClasses = "px-3 py-2.5",
    enableInlineLinks = false,
    enableSyntaxHighlighting = false,
    appendBubbleMenuTo,
    onBlurAtTop,
    disableSlashCommand = false,
    disableMentions = false,
    disableReactions = false,
  } = props;

  const hasMounted = useHasMounted();
  const onChangeDebouncedInner = useDebouncedCallback((editor: Editor) => {
    onChangeDebounced?.(editor.getHTML());
  }, onChangeDebounceMs);

  const extensions = useMemo(() => {
    return [
      ...getMarkdownExtensions({
        placeholder,
      }),
    ];
  }, []);

  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
    autofocus: false,
    editorProps: {
      attributes: {
        id: id,
        class: cn(
          "prose editing w-full max-w-full select-auto overflow-hidden focus:outline-none",
          {
            "text-sm": textSize === "sm",
          },
          containerClasses,
        ),
        style: `min-height: ${minHeight}; max-height: ${maxHeight};`,
      },
    },
    parseOptions: {
      preserveWhitespace: true,
    },
    extensions,
    content,
    editable: !props.disabled,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();

      /**
       * Note 1: `onEmptyDidChange` will return `false` for content that we'd later trim to a blank string, e.g. `<p> </p>` -> ''
       * We don't check for this here because it's expensive to do on every keypress, but if submitting blank content is a concern,
       * consumers of this component should check `trimHtml(editor.getHTML()) !== ''` before submitting.
       *
       * Note 2: We don't use `editor.isEmpty` because it only checks against inner content which can result in false negatives,
       * even if the node if valid by itself.
       */
      onEmptyDidChange?.(htmlContent === EMPTY_HTML);

      onChangeDebouncedInner(editor);
    },
  });

  useEffect(() => {
    editor.setEditable(!props.disabled);
  }, [editor, props.disabled]);

  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => editor.getHTML() || "",
      setHTML: (html: string) => editor.commands.setContent(html),
      isEmpty: () => !!editor.isEmpty,
      clearAndBlur: () => editor.chain().setContent(EMPTY_HTML).blur().run(),
      insertReaction: (props) => !!editor.commands.insertReaction(props),
      focus: (pos = "start") => {
        if (!editor) return;

        if (pos === "start") {
          editor.commands.focus("start");
        } else if (pos === "start-newline") {
          focusAtStartWithNewline(editor);
        } else if (pos === "end") {
          editor.commands.focus("end");
        } else if (pos === "restore") {
          editor.commands.focus();
        }
      },
      isFocused: () => !!editor.isFocused,
    }),
    [editor],
  );

  // hacky solution to make the placeholder reactive
  // https://github.com/ueberdosis/tiptap/issues/1935#issuecomment-1344072244
  useEffect(() => {
    if (placeholder !== "") {
      editor.extensionManager.extensions.filter(
        (extension) => extension.name === "placeholder",
      )[0].options["placeholder"] = placeholder;
      editor.view.dispatch(editor.state.tr);
    }
  }, [editor, placeholder]);

  useEffect(() => {
    if (content === EMPTY_HTML) {
      editor.commands?.clearContent();

      if (isSubmitted) {
        editor.commands?.blur();
      }
    }
  }, [content, editor, isSubmitted]);

  useEffect(() => {
    if (hasMounted && autoFocus) {
      try {
        editor.commands?.focus(autoFocus);
      } catch (e) {
        // Do nothing, this can crash if the editor is not mounted and we try to focus it (e.g. when the editor HMR)
      }
    }
  }, [hasMounted, editor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!props.disabled && (
        <EditorBubbleMenu editor={editor} tippyAppendTo={appendBubbleMenuTo} />
      )}
      <EditorContent
        className="flex flex-1"
        editor={editor}
        onClick={onClick}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </>
  );
});

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
