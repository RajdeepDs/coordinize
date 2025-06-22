"use client";

import "@coordinize/ui/editor";

import { markdownExtensions } from "@coordinize/editor";
import { cn } from "@coordinize/ui/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { EditorBubbleMenu } from "../editor-bubble-menu";
import { SlashCommand } from "../slash-command";

interface MarkdownEditorProps {
  id?: string;
  placeholder?: string;
  content?: string;
  minHeight?: string;
  maxHeight?: string;
  textSize?: "sm" | "base";
  containerClasses?: string;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const {
    id = "",
    placeholder,
    content,
    maxHeight,
    minHeight,
    textSize,
    containerClasses = "px-3 py-2.5",
  } = props;

  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
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
      extensions: [...markdownExtensions()],
      content,
    },
    [],
  );

  return (
    <>
      <EditorContent editor={editor} />
      <EditorBubbleMenu editor={editor} />
      <SlashCommand editor={editor} />
    </>
  );
}
