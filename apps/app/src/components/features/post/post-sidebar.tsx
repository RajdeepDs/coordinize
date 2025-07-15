'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Switch } from '@coordinize/ui/components/switch';
import { PostSidebarActions } from './post-sidebar-actions';
import { PostSidebarFooter } from './post-sidebar-footer';
import { SpaceGroup } from './space-group';

interface PostSidebarProps {
  spaceName: string;
  postId: string;
  spaceIcon: string | null;
}

export function PostSidebar({
  spaceName,
  postId,
  spaceIcon,
}: PostSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <SpaceGroup icon={spaceIcon} spaceName={spaceName} />
      <SidebarGroup className="pl-0">
        <SidebarGroupLabel>Subscribe</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between p-2 text-sm">
              <span className="select-none">New Activity</span>
              <Switch defaultChecked />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <PostSidebarActions postId={postId} />
      <PostSidebarFooter postId={postId} />
    </div>
  );
}
