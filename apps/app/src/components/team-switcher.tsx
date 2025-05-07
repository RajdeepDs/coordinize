"use client";

import Link from "next/link";

import { authClient } from "@coordinize/auth/auth-client";
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
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { redirect, useParams } from "next/navigation";

export function TeamSwitcher() {
  const params = useParams<{ slug: string }>();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-9">
            <SidebarMenuButton className="w-fit focus-visible:ring-0">
              <div className="flex size-5 items-center justify-center rounded border bg-white">
                A
              </div>
              <Label className="font-normal">Acme, Inc.</Label>
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
                      rajdeepds626@gmail.com
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <div className="flex size-5 items-center justify-center rounded border bg-white">
                        A
                      </div>
                      <Label className="font-normal">Acme, Inc.</Label>
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
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
          >
            <Link href={"/search"}>
              <Icons.search />
            </Link>
          </Button>
          <SidebarTrigger className="size-9 text-muted-foreground" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
