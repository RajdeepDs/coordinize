'use client';

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { usePathname } from 'next/navigation';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'sonner';
import { getUrl } from '@/utils/environment';

interface PostSidebarFooterProps {
  postId: string;
}

export function PostSidebarFooter({ postId }: PostSidebarFooterProps) {
  const pathname = usePathname();
  const baseUrl = getUrl();

  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyLink = () => {
    const currentUrl = `${baseUrl}${pathname}`;
    copyToClipboard(currentUrl);
    toast.success('Post link copied to clipboard');
  };

  const handleCopyId = () => {
    copyToClipboard(postId);
    toast.success('Post ID copied to clipboard');
  };

  return (
    <SidebarFooter className="pl-0">
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
