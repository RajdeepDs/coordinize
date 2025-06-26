"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { authClient } from "@coordinize/auth/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@coordinize/ui/components/avatar";
import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import { Label } from "@coordinize/ui/components/label";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";

export function TeamSwitcher({ email }: { email: string }) {
  const trpc = useTRPC();
  const { data: workspace } = useQuery(trpc.workspace.current.queryOptions());

  const params = useParams<{ slug: string }>();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-8">
            <SidebarMenuButton className="w-fit focus-visible:ring-0">
              <Avatar className="size-5 rounded border">
                <AvatarImage src={workspace?.logo ?? ""} alt="workspace-logo" />
                <AvatarFallback className="select-none">
                  {workspace?.name.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Label className="font-normal">{workspace?.name}</Label>
              <Icons.chevronUpDown className="text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 font-normal text-accent-foreground"
          >
            <DropdownMenuItem asChild>
              <Link href={`/${params.slug}/settings/preferences`}>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${params.slug}/settings/members`}>
                Invite or manage members
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Switch workspace</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 font-normal text-accent-foreground">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="select-none py-1 font-normal text-muted-foreground text-sm">
                      {email}
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Avatar className="size-5 rounded border">
                        <AvatarImage
                          src={workspace?.logo ?? ""}
                          alt="workspace-logo"
                        />
                        <AvatarFallback className="select-none">
                          {workspace?.name.at(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Label className="font-normal">{workspace?.name}</Label>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Create or join a workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem>Add an account</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/private-beta");
                    },
                  },
                })
              }
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-1">
          <Button
            asChild
            size={"icon"}
            variant={"ghost"}
            tooltip="Search workspace"
            className="size-7 rounded-sm text-muted-foreground"
          >
            <Link href={"/search"}>
              <Icons.search />
            </Link>
          </Button>
          {!isMobile && (
            <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
