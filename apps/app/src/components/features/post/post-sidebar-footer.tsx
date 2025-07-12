import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';

export function PostSidebarFooter() {
  return (
    <SidebarFooter className="pl-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.link />
            <span>Copy link</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icons.link2 />
            <span>Copy ID</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
