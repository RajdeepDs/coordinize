import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@coordinize/ui/components/avatar";
import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";

export function AppFooter() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="select-none">C</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus-visible:ring-0">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-muted-foreground"
              >
                <Icons.emojiPlus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              Select Emoji
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
            disabled
          >
            <Icons.archive />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
          >
            <Icons.help />
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
