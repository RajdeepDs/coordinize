import { Label } from "@coordinize/ui/components/label";
import { cn } from "@coordinize/ui/lib/utils";
import type { ReactNode } from "react";

interface SettingsCardProps {
  readonly children?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function SettingsCard({
  title,
  description,
  className,
  children,
}: SettingsCardProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="flex flex-col">
        <Label className="text-sm">{title}</Label>
        <p className="select-none text-muted-foreground text-sm">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
