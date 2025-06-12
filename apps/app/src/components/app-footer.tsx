import AvatarStatus from "@/components/ui/avatar-status";
import { EmojiPickerPopover } from "@/components/ui/emoji-picker";
import { HelpInfo } from "@/components/ui/help-info";
import { Button } from "@coordinize/ui/components/button";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";

interface AppFooterProps {
  user: {
    name: string;
    image: string | null;
    statusEmoji: string | null;
  };
}

export function AppFooter({ user }: AppFooterProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AvatarStatus
            src={user.image ?? ""}
            alt="user-image"
            fallback={user.name.at(0)?.toUpperCase() ?? "A"}
            className="size-6 ring-ui-gray-500 ring-offset-1 ring-offset-sidebar transition-all duration-200 ease-in-out hover:ring-2"
          />
          <EmojiPickerPopover statusEmoji={user.statusEmoji || ""} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-7 rounded-sm text-muted-foreground"
            disabled
          >
            <Icons.archive />
          </Button>
          <HelpInfo />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
