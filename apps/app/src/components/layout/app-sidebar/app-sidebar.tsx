'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@coordinize/ui/components/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { PostComposerDialog } from '@/components/features/post-composer/post-composer-dialog';
import { appSidebarNav } from '@/config/app-sidebar-navigation';
import { useDraftPostsQuery } from '@/hooks/use-draft-posts';
import { useNotificationCounts } from '@/hooks/use-notifications';
import { useSpacesQuery } from '@/hooks/use-space';
import { useUserQuery } from '@/hooks/use-user';
import { AppFooter } from './app-footer';
import { FavoritesGroup } from './favorite-group';
import { TeamSwitcher } from './team-switcher';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data: user } = useUserQuery();
  const { data: spaces } = useSpacesQuery();
  const { data: draftPosts } = useDraftPostsQuery();
  const { data: notificationCounts } = useNotificationCounts();

  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const sidebarNav = appSidebarNav(slug);
  const hasDrafts = draftPosts && draftPosts.length > 0;

  return (
    <Sidebar {...props} className="border-none">
      <SidebarHeader className="flex items-center">
        <TeamSwitcher email={user.email} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-2">
                <PostComposerDialog />
              </SidebarMenuItem>
              {sidebarNav.map((nav) => {
                if (nav.conditional && nav.title === 'Drafts' && !hasDrafts) {
                  return null;
                }

                const Icon = Icons[nav.icon as keyof typeof Icons];
                const isDraftItem = nav.conditional && nav.title === 'Drafts';
                const isInboxItem = nav.title === 'Inbox';

                return (
                  <SidebarMenuItem
                    className={
                      isDraftItem
                        ? 'slide-in-from-bottom-2 fade-in animate-in duration-300 ease-out'
                        : ''
                    }
                    key={nav.title}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === nav.href}
                      tooltip={nav.tooltip}
                      tooltipShortcut={nav.tooltipShortcut}
                    >
                      <Link href={nav.href}>
                        <Icon />
                        <span>{nav.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {isDraftItem && hasDrafts && (
                      <SidebarMenuBadge className="text-muted-foreground">
                        {draftPosts?.length}
                      </SidebarMenuBadge>
                    )}
                    {isInboxItem &&
                      notificationCounts &&
                      notificationCounts.unreadCount > 0 && (
                        <SidebarMenuBadge className="bg-blue-500 text-white">
                          {notificationCounts.unreadCount}
                        </SidebarMenuBadge>
                      )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <FavoritesGroup slug={slug} />
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Spaces
                <Icons.ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* List of spaces */}
                  {spaces?.map((space) => {
                    return (
                      <SidebarMenuItem key={space.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathname === `/${slug}/spaces/${space.identifier}`
                          }
                        >
                          <Link href={`/${slug}/spaces/${space.identifier}`}>
                            {space.icon ? (
                              <span className="text-xs">{space.icon}</span>
                            ) : (
                              <Icons.space />
                            )}
                            <span>{space.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Create a new space">
                      <Link href={`/${slug}/settings/new-space`}>
                        <Icons.plus />
                        <span>New space</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <AppFooter user={user} />
      </SidebarFooter>
      <SidebarRail className="my-2 mr-1" />
    </Sidebar>
  );
}
