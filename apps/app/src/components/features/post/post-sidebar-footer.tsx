"use client";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { usePathname } from "next/navigation";
import { copyPostId, copyPostLink } from "@/utils/clipboard";

type PostSidebarFooterProps = {
  postId: string;
};

export function PostSidebarFooter({ postId }: PostSidebarFooterProps) {
  const pathname = usePathname();

  const handleCopyLink = () => {
    copyPostLink(pathname);
  };

  const handleCopyId = () => {
    copyPostId(postId);
  };

  return (
    <SidebarFooter className="pl-2 sm:pl-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleCopyLink}>
            <Icons.link />
            <span>Copy link</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleCopyId}>
            <Icons.link2 />
            <span>Copy ID</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
