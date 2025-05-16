"use client";

import { cn } from "@coordinize/ui/lib/utils";
import { useState } from "react";
import { PostInputDialog } from "../ui/post-input-dialog";

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  const [maximize, setMaximize] = useState(false);

  const handleMaximize = () => {
    setMaximize(!maximize);
  };
  return (
    <div className="flex h-full w-full flex-col px-80">
      <div className="flex flex-col gap-4">
        <PostInputDialog maximize={maximize} onMaximize={setMaximize} />
        <div className={cn(maximize && "hidden")}>{children}</div>
      </div>
    </div>
  );
}
