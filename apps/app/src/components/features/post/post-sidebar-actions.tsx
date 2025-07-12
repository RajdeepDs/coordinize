import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';

export function PostSidebarActions() {
  return (
    <SidebarGroup className="pl-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.resolve />
            <span>Resolve post</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.archive />
            <span>Archive post</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.circleX />
            <span>Delete</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
