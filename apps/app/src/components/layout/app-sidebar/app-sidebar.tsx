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
import { useGlobalHotkeys } from '@coordinize/ui/hooks';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

  const sidebarNav = appSidebarNav(slug);
  const hasDrafts = draftPosts && draftPosts.length > 0;

  // Create keyboard shortcuts for spaces (alt+1, alt+2, etc.)
  const handleSpaceShortcut = (index: number) => {
    const space = spaces?.[index - 1];
    if (space) {
      router.push(`/${slug}/spaces/${space.identifier}`);
    }
  };

  // Calculate how many spaces we have (max 9 for shortcuts)
  const spacesCount = spaces?.length ?? 0;

  // Only enable shortcuts for spaces that actually exist
  useGlobalHotkeys({
    keys: 'alt+1',
    callback: () => handleSpaceShortcut(1),
    options: { enabled: !!user && spacesCount >= 1 },
  });
  useGlobalHotkeys({
    keys: 'alt+2',
    callback: () => handleSpaceShortcut(2),
    options: { enabled: !!user && spacesCount >= 2 },
  });
  useGlobalHotkeys({
    keys: 'alt+3',
    callback: () => handleSpaceShortcut(3),
    options: { enabled: !!user && spacesCount >= 3 },
  });
  useGlobalHotkeys({
    keys: 'alt+4',
    callback: () => handleSpaceShortcut(4),
    options: { enabled: !!user && spacesCount >= 4 },
  });
  useGlobalHotkeys({
    keys: 'alt+5',
    callback: () => handleSpaceShortcut(5),
    options: { enabled: !!user && spacesCount >= 5 },
  });
  useGlobalHotkeys({
    keys: 'alt+6',
    callback: () => handleSpaceShortcut(6),
    options: { enabled: !!user && spacesCount >= 6 },
  });
  useGlobalHotkeys({
    keys: 'alt+7',
    callback: () => handleSpaceShortcut(7),
    options: { enabled: !!user && spacesCount >= 7 },
  });
  useGlobalHotkeys({
    keys: 'alt+8',
    callback: () => handleSpaceShortcut(8),
    options: { enabled: !!user && spacesCount >= 8 },
  });
  useGlobalHotkeys({
    keys: 'alt+9',
    callback: () => handleSpaceShortcut(9),
    options: { enabled: !!user && spacesCount >= 9 },
  });

  // Register Alt+0 for new space
  useGlobalHotkeys({
    keys: 'alt+0',
    callback: () => router.push(`/${slug}/settings/new-space`),
    options: { enabled: !!user },
  });

  if (!user) {
    return null;
  }

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
                  {spaces?.map((space, index) => {
                    const shortcutNumber = index + 1;

                    const hasShortcut = shortcutNumber <= 9;

                    return (
                      <SidebarMenuItem key={space.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathname === `/${slug}/spaces/${space.identifier}`
                          }
                          tooltip={space.name}
                          tooltipShortcut={
                            hasShortcut ? `Alt+${shortcutNumber}` : undefined
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
                    <SidebarMenuButton
                      asChild
                      tooltip="Create a new space"
                      tooltipShortcut="Alt+0"
                    >
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
