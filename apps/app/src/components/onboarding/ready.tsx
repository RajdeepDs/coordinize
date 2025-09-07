"use client";

import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/lib/icons";

type ReadyProps = {
  nextStep: () => void;
};

const highlights = [
  {
    icon: <Icons.post className="size-5 text-ui-gray-800" />,
    title: "Purpose-Driven Posts",
    description:
      "Keep discussions focused and actionable with structured async updates.",
  },
  {
    icon: <Icons.space className="size-5 text-ui-gray-800" />,
    title: "Spaces, Not Channels",
    description:
      "Organize work by goals, not noise - each space is a shared focus area.",
  },
  {
    icon: <Icons.userCircle className="size-5 text-ui-gray-800" />,
    title: "Always in Sync",
    description:
      "Everyone stays aligned, no matter their time zone or working hours.",
  },
] as const;

export function Ready({ nextStep }: ReadyProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-8 px-4 text-center sm:px-0">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="font-medium text-lg">You're good to go</h1>
        <p className="text-muted-foreground text-sm">
          Go ahead and explore the app. When you're ready, create your first
          post by pressing{" "}
          <code className="rounded border bg-background px-1.5 pb-0.5 font-mono">
            c
          </code>
          .
        </p>
      </div>

      <div className="grid grid-rows-3 divide-y rounded-md border lg:grid-cols-3 lg:grid-rows-1 lg:divide-x lg:divide-y-0">
        {highlights.map(({ icon, title, description }) => (
          <div
            className="flex w-xs flex-col items-start gap-2 px-4 py-6 text-start text-sm"
            key={title}
          >
            {icon}
            <h2 className="font-medium">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>

      <Button className="h-11 w-3xs" onClick={nextStep} size="lg">
        Open Coordinize
      </Button>
    </div>
  );
}
