import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@coordinize/ui/components/popover";
import { Toggle } from "@coordinize/ui/components/toggle";
import { Icons } from "@coordinize/ui/lib/icons";
import { useMemo } from "react";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof Icons;
};

export type ContentPickerOptions = Array<ContentTypePickerOption>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

export function ContentTypeDropdown({ options }: ContentTypePickerProps) {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === "option" && option.isActive()),
    [options],
  );
  return (
    <Popover>
      <PopoverTrigger>
        <Toggle size={"sm"} className="gap-0.5">
          {activeItem &&
            (() => {
              const Icon = Icons[activeItem.icon as keyof typeof Icons];
              return <Icon />;
            })()}
          <Icons.chevronDown />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-1 px-1 py-1">
        {options.map((option) => {
          if (option.type === "option") {
            const Icon = Icons[option.icon as keyof typeof Icons];
            return (
              <Toggle
                key={option.id}
                size={"sm"}
                disabled={option.disabled()}
                onClick={option.onClick}
              >
                <Icon />
                {option.label}
              </Toggle>
            );
          }
        })}
      </PopoverContent>
    </Popover>
  );
}
