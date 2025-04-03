"use client";

import type { SidebarSection } from "@/config/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface AppSidebarProps {
  readonly nav: SidebarSection[];
}

export function SettingsSidebar({ nav }: AppSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
              <Link href={"/"}>
                <Icons.chevronLeft />
                Back to app
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {nav.map((block) => (
          <SidebarGroup key={block.title}>
            <SidebarGroupLabel>{block.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {block.items.map((item) => {
                  const Icon = Icons[item.icon as keyof typeof Icons];
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="text-sidebar-foreground/70"
                      >
                        <Link href={item.href}>
                          <Icon />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-fit">
                <SidebarMenuButton>
                  <Icons.help />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-fit">
                {helpNav.map((block) => (
                  <Fragment key={block.index}>
                    <DropdownMenuGroup>
                      {block.items.map((item) => {
                        const Icon = Icons[item.icon as keyof typeof Icons];
                        return (
                          <DropdownMenuItem key={item.title}>
                            <Icon />
                            {item.title}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                    {block.index !== helpNav.length && (
                      <DropdownMenuSeparator />
                    )}
                  </Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export const helpNav = [
  {
    index: 1,
    items: [
      {
        title: "Onboarding",
        href: "/onboarding",
        icon: "circleAlert",
      },
      {
        title: "Documentations",
        href: "/docs",
        icon: "bookOpen",
      },
    ],
  },
  {
    index: 2,
    items: [
      {
        title: "Shortcuts",
        icon: "keyboard",
      },
    ],
  },
  {
    index: 3,
    items: [
      {
        title: "Changelog",
        href: "/changelog",
        icon: "calendar",
      },
    ],
  },
];
