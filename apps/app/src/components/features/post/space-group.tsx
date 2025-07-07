import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';

export function SpaceGroup({ spaceName }: { spaceName: string }) {
  return (
    <SidebarGroup className="pl-0">
      <SidebarGroupLabel>Space</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span className="flex items-center gap-2">
              <Icons.space size={16} />
              <span>{spaceName}</span>
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
