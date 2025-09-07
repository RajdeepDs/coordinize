import { cn } from "@coordinize/ui/lib/utils";

type DotProps = {
  className?: string;
};

export function Dot({ className }: DotProps) {
  return (
    <span
      className={cn(
        "size-1 flex-shrink-0 rounded-full bg-ui-gray-700",
        className
      )}
    />
  );
}
