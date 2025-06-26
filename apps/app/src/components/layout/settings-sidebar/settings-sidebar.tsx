"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HelpInfo } from "@/components/ui/help-info";
import type { SidebarSection } from "@/config/navigation";
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
  useSidebar,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";

interface SettingsSidebarProps {
  readonly nav: SidebarSection[];
}

export function SettingsSidebar({ nav }: SettingsSidebarProps) {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className={cn(isMobile && "hidden")}>
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
                        onClick={() => {
                          if (isMobile) toggleSidebar();
                        }}
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
        <HelpInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
