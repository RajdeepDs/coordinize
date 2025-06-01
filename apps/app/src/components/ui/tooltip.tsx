import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@coordinize/ui/components/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  label?: string;
  shortcut?: string;
  sideOffset: number;
}

export function TooltipFusion({
  children,
  label,
  shortcut,
  sideOffset,
}: TooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        className="flex items-center gap-1"
      >
        {label}
        {shortcut && <div className="text-gray-500 text-sm">{shortcut}</div>}
      </TooltipContent>
    </Tooltip>
  );
}
