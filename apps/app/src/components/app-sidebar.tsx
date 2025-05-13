"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { appSidebarNav } from "@/config/app-sidebar-navigation";
import { useUserQuery } from "@/hooks/use-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@coordinize/ui/components/collapsible";
import { Label } from "@coordinize/ui/components/label";
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
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { AppFooter } from "./app-footer";
import { TeamSwitcher } from "./team-switcher";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data: user } = useUserQuery();

  if (!user) {
    return null;
  }

  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

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
              <SidebarMenuItem>
                <SidebarMenuButton
                  variant={"outline"}
                  className="flex cursor-pointer justify-center border bg-background hover:bg-background"
                >
                  <Icons.plus />
                  <span>New post</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {sidebarNav.map((nav) => {
                const Icon = Icons[nav.icon as keyof typeof Icons];
                return (
                  <SidebarMenuItem key={nav.title}>
                    <SidebarMenuButton isActive={pathname === nav.href} asChild>
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
        <Collapsible defaultOpen className="group/collapsible">
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
      </SidebarContent>
      <SidebarFooter>
        <AppFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
