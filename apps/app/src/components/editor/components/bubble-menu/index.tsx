import { EditorBubble } from "novel";
import { useState } from "react";

import { Separator } from "@coordinize/ui/components/separator";
import { LinkSelector } from "./link-selector";
import { NodeSelector } from "./node-selector";
import { TextButtons } from "./text-buttons";

export function FloatingMenu() {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  return (
    <EditorBubble
      tippyOptions={{
        placement: "top",
      }}
      className="flex h-9 w-fit max-w-[90vw] items-center overflow-hidden rounded-md border bg-background shadow-md"
    >
      <NodeSelector open={openNode} onOpenChange={setOpenNode} />
      <Separator orientation="vertical" />
      <TextButtons />
      <Separator orientation="vertical" />
      <LinkSelector open={openLink} onOpenChange={setOpenLink} />
    </EditorBubble>
  );
}
