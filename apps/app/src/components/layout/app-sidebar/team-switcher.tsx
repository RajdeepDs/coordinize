'use client';

import { authClient } from '@coordinize/auth/auth-client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@coordinize/ui/components/avatar';
import { Button } from '@coordinize/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import { Label } from '@coordinize/ui/components/label';
import { LayeredHotkeys } from '@coordinize/ui/components/layered-hotkeys';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCurrentWorkspaceQuery } from '@/hooks/use-workspace';

export function TeamSwitcher({ email }: { email: string }) {
  const router = useRouter();
  const { data: workspace } = useCurrentWorkspaceQuery();
  const params = useParams<{ slug: string }>();
  const { isMobile } = useSidebar();

  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  }

  return (
    <>
      <LayeredHotkeys
        callback={handleLogout}
        keys={'alt+shift+q'}
        options={{ preventDefault: true }}
      />
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-8">
              <SidebarMenuButton className="w-fit focus-visible:ring-0">
                <Avatar className="size-5 overflow-hidden rounded border">
                  <AvatarImage
                    alt="workspace-logo"
                    src={workspace?.logo ?? ''}
                  />
                  <AvatarFallback className="select-none rounded-none">
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
                  <DropdownMenuShortcut>G then S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${params.slug}/settings/members`}>
                  Invite or manage members
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Switch workspace
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 font-normal text-accent-foreground">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="select-none py-1 font-normal text-muted-foreground text-sm">
                        {email}
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Avatar className="size-5 rounded border">
                          <AvatarImage
                            alt="workspace-logo"
                            src={workspace?.logo ?? ''}
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
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>Alt ⇧ Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-1">
            <Button
              asChild
              className="size-7 rounded-sm text-muted-foreground"
              size={'icon'}
              tooltip="Search workspace"
              variant={'ghost'}
            >
              <Link href={`/${params.slug}/search`}>
                <Icons.search />
              </Link>
            </Button>
            {!isMobile && (
              <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
            )}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
