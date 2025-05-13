"use client";

import { Separator } from "@coordinize/ui/components/separator";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
  handleCommandNavigation,
} from "novel";
import { useState } from "react";
import { ColorSelector } from "./editor.colors";
import { LinkSelector } from "./editor.link-selector";
import { NodeSelector } from "./editor.node-selector";
import { TextButtons } from "./editor.text-buttons";
import { defaultExtensions } from "./extentions";
import { slashCommand, suggestionItems } from "./slash-command";

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
  placeholder,
}: EditorProps) {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  return (
    <EditorRoot>
      <EditorContent
        initialContent={initialContent || defaultEditorContent}
        extensions={[...defaultExtensions, slashCommand]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class:
              "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
      >
        {/* Slash Command */}
        <EditorCommand>
          <EditorCommandEmpty>No results</EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => {
                  // Prevent default behavior that might cause refresh
                  item.command?.(val);
                  return false;
                }}
                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-[10px] hover:bg-accent aria-selected:bg-accent"
                key={item.title}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-xs">{item.title}</p>
                  <p className="text-[8px] text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex h-full w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" className="h-9" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
