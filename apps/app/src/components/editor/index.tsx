"use client";

import { cn } from "@coordinize/ui/lib/utils";
import {
  EditorContent,
  EditorRoot,
  type JSONContent,
  Placeholder,
  handleCommandNavigation,
} from "novel";
import { FloatingMenu } from "./components/bubble-menu";
import { SlashCommand } from "./components/slash-commands";
import { slashCommand } from "./components/slash-commands/slash-command";
import { defaultExtensions } from "./extensions/extentions";

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

interface EditorProps {
  initialContent?: JSONContent;
  readOnly?: boolean;
  placeholder?: string;
}

export default function Editor({
  initialContent,
  readOnly,
  placeholder = "Start typing...",
}: EditorProps) {
  return (
    <EditorRoot>
      <EditorContent
        autofocus
        initialContent={initialContent || defaultEditorContent}
        extensions={[
          ...defaultExtensions,
          slashCommand,
          Placeholder.configure({
            placeholder,
          }),
        ]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: cn(
              "prose dark:prose-invert min-h-[200px] max-w-full prose-headings:font-title focus:outline-none",
              readOnly && "pointer-events-none select-text",
            ),
          },
        }}
      >
        <SlashCommand />
        <FloatingMenu />
      </EditorContent>
    </EditorRoot>
  );
}
