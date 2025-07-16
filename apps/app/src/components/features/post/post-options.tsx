import { Button } from '@coordinize/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/components/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { useDeletePost, useResolvePost } from '@/hooks/use-posts';
import { copyPostLink } from '@/utils/clipboard';

interface PostOption {
  icon: (typeof Icons)[keyof typeof Icons];
  label: string;
  onClick?: () => void;
}

interface PostOptionsProps {
  postId: string;
}

export function PostOptions({ postId }: PostOptionsProps) {
  const pathname = usePathname();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: resolvePost } = useResolvePost();

  const handleDeletePost = () => {
    deletePost({ id: postId });
  };

  const handleResolvePost = () => {
    resolvePost({ id: postId });
  };

  const handleCopyLink = () => {
    copyPostLink(pathname);
  };

  const options: PostOption[][] = [
    [
      {
        icon: Icons.bellDot,
        label: 'Subscribe',
      },
      {
        icon: Icons.star,
        label: 'Favorite',
      },
    ],
    [
      {
        icon: Icons.space,
        label: 'Move to space',
      },
      {
        icon: Icons.pin,
        label: 'Pin to space',
      },
      {
        icon: Icons.resolve,
        label: 'Resolve post',
        onClick: handleResolvePost,
      },
    ],
    [
      {
        icon: Icons.share,
        label: 'Share',
      },
      {
        icon: Icons.link,
        label: 'Copy link',
        onClick: handleCopyLink,
      },
    ],
    [
      {
        icon: Icons.trash,
        label: 'Delete post',
        onClick: handleDeletePost,
      },
    ],
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('size-7 rounded-sm text-muted-foreground')}
          size={'icon'}
          tooltip="More options"
          variant={'ghost'}
        >
          <Icons.ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-56 overflow-hidden rounded-lg p-0"
      >
        <Sidebar className="bg-transparent" collapsible="none">
          <SidebarContent className="gap-0">
            {options.map((group) => (
              <SidebarGroup
                className="border-b p-1 last:border-none"
                key={group.map((item) => item.label).join('-')}
              >
                <SidebarGroupContent className="gap-0 p-0">
                  <SidebarMenu>
                    {group.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton onClick={item.onClick}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  );
}
