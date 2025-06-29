'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@coordinize/ui/components/collapsible';
import { Label } from '@coordinize/ui/components/label';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ComposerDialog } from '@/components/features/post-composer/composer-dialog';
import { appSidebarNav } from '@/config/app-sidebar-navigation';
import { useSpacesQuery } from '@/hooks/use-space';
import { useUserQuery } from '@/hooks/use-user';
import { AppFooter } from './app-footer';
import { TeamSwitcher } from './team-switcher';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data: user } = useUserQuery();
  const { data: spaces } = useSpacesQuery();
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const sidebarNav = appSidebarNav(slug);

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
                <ComposerDialog />
              </SidebarMenuItem>
              {sidebarNav.map((nav) => {
                const Icon = Icons[nav.icon as keyof typeof Icons];
                return (
                  <SidebarMenuItem key={nav.title}>
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
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Favorites
                <Icons.ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Label className="font-normal text-muted-foreground">
                        Favorite your most important posts.
                      </Label>
                      <Icons.star className="text-muted-foreground" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
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
                            <Icons.space />
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
