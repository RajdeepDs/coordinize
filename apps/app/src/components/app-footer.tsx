import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@coordinize/ui/components/avatar";
import { Button } from "@coordinize/ui/components/button";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { EmojiPickerPopover } from "./ui/emoji-picker";
import { HelpInfo } from "./ui/help-info";

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
          <Avatar className="size-6 border-2">
            <AvatarImage src={user?.image ?? ""} alt="user-image" />
            <AvatarFallback className="select-none">
              {user.name.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
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
