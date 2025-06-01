import { Label } from "@coordinize/ui/components/label";
import { ConditionalWrap } from "@coordinize/ui/conditional-wrap";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";
import { forwardRef } from "react";
import { TooltipFusion } from "../ui/tooltip";

type BubbleMenuButtonElement = React.ElementRef<"button">;

interface BubbleMenuProps extends React.ComponentPropsWithRef<"button"> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  icon: React.ReactNode;
  title?: string;
  tooltip?: string;
  shortcut?: string;
  dropdown?: boolean;
}

export const BubbleMenuButton = forwardRef<
  BubbleMenuButtonElement,
  BubbleMenuProps
>(function BubbleMenuButton(
  {
    icon,
    isActive = false,
    onClick,
    title,
    tooltip,
    shortcut,
    dropdown,
    ...props
  }: BubbleMenuProps,
  ref,
) {
  return (
    <ConditionalWrap
      condition={!!tooltip}
      wrap={(children) => (
        <TooltipFusion label={tooltip} shortcut={shortcut} sideOffset={8}>
          {children}
        </TooltipFusion>
      )}
    >
      <button
        {...props}
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          "group flex flex-row items-center gap-1 rounded p-1 hover:bg-quaternary",
          {
            "bg-blue-500 text-white hover:bg-blue-500": isActive,
          },
        )}
      >
        {icon}
        {title && <Label className="text-sm">{title}</Label>}
        {dropdown && (
          <span className="-ml-1 text-tertiary group-hover:text-primary">
            <Icons.chevronDown strokeWidth="2" size={16} />
          </span>
        )}
      </button>
    </ConditionalWrap>
  );
});
