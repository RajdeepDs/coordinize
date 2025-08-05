'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Switch } from '@coordinize/ui/components/switch';
import { Icons } from '@coordinize/ui/lib/icons';
import AvatarStatus from '@/components/ui/avatar-status';
import { useSpaceWithPublishedPostsQuery } from '@/hooks/use-space';

interface SpaceSidebarProps {
  identifier: string;
}

export function SpaceSidebar({ identifier }: SpaceSidebarProps) {
  const { data: space } = useSpaceWithPublishedPostsQuery(identifier);

  const membersCount = space?.members.length || 0;
  return (
    <div className="flex h-full w-full flex-col">
      <SidebarGroup className="pl-2 sm:pl-0">
        <SidebarGroupLabel>About</SidebarGroupLabel>
        <p className="px-2 text-sm">
          {space?.about || 'No description available.'}
        </p>
      </SidebarGroup>
      <SidebarGroup className="hidden pl-2 sm:pl-0">
        <SidebarGroupLabel>
          {membersCount} member{membersCount !== 1 ? 's' : ''}
        </SidebarGroupLabel>
        <SidebarGroupContent className="flex items-center">
          {space?.members.map((member) => (
            <div
              className="flex items-center gap-2 px-2 py-1"
              key={member.user.id}
            >
              <AvatarStatus
                alt={member.user.name}
                className="size-6"
                fallback={member.user.name}
                src={member.user.image ?? ''}
                statusShow={false}
              />
            </div>
          ))}
          <Button
            className="size-7 rounded-full"
            size={'icon'}
            tooltip="Add member"
            variant={'secondary'}
          >
            <Icons.plus />
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>
      {/* TODO: Implement Notifications functionality */}
      <SidebarGroup className="hidden pl-2 sm:pl-0">
        <SidebarGroupLabel>Notifications</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between p-2 text-sm">
              <span className="select-none">New posts</span>
              <Switch defaultChecked />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
