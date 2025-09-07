import { KeyboardShortcut } from "@coordinize/ui/components/keyboard-shortcut";
import { Label } from "@coordinize/ui/components/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@coordinize/ui/components/sheet";
import { keyboardShortcuts } from "@/config/shortcuts";
import { ScrollableContainer } from "../layout/scrollable-container";

type ShortcutSheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ShortcutSheet({ open, onOpenChange }: ShortcutSheetProps) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="m-2 h-[calc(100vh-1rem)] w-[600px] max-w-[90vw] rounded-lg border shadow-lg">
        <SheetHeader>
          <SheetTitle className="font-medium">Keyboard Shortcuts</SheetTitle>
          <SheetDescription className="sr-only">
            Here are some useful keyboard shortcuts to enhance your experience.
            You can also customize these shortcuts in the settings.
          </SheetDescription>
        </SheetHeader>
        <ScrollableContainer>
          <div className="space-y-8 p-4">
            {keyboardShortcuts.map((group) => (
              <div className="space-y-3" key={group.title}>
                <Label className="font-medium text-foreground text-sm">
                  {group.title}
                </Label>
                <div className="space-y-3">
                  {group.shortcuts.map((shortcut) => (
                    <div
                      className="flex items-center justify-between text-sm text-ui-gray-900"
                      key={shortcut.id}
                    >
                      <span className="">{shortcut.description}</span>
                      <KeyboardShortcut
                        className="shrink-0"
                        shortcut={shortcut.shortcut}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </SheetContent>
    </Sheet>
  );
}
