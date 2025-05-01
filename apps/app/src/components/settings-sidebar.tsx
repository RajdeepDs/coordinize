"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { helpNav } from "@/config/help-nav";
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

interface SettingsSidebarProps {
  readonly nav: SidebarSection[];
}

export function SettingsSidebar({ nav }: SettingsSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar variant="inset" className="p-0">
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
              <SidebarMenu className="gap-0.5">
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
