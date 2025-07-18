import { Button } from '@coordinize/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { usePathname } from 'next/navigation';
import {
  useDeletePost,
  useMovePostToSpace,
  usePinPostToSpace,
  usePostByIdQuery,
  useResolvePost,
  useUnresolvePost,
} from '@/hooks/use-posts';
import { useSpacesQuery } from '@/hooks/use-space';
import { useToggleFavorite } from '@/hooks/use-toggle-favorite';
import { copyPostLink } from '@/utils/clipboard';

interface PostOption {
  icon: (typeof Icons)[keyof typeof Icons];
  label: string;
  onClick?: () => void;
  subMenu?: Array<{
    icon?: string;
    label: string;
    onClick?: () => void;
  }>;
}

interface PostOptionsProps {
  postId: string;
}

export function PostOptions({ postId }: PostOptionsProps) {
  const pathname = usePathname();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: resolvePost } = useResolvePost(postId);
  const { mutate: unresolvePost } = useUnresolvePost(postId);
  const { mutate: movePostToSpace } = useMovePostToSpace(postId);
  const { mutate: pinPostToSpace } = usePinPostToSpace(postId);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { data: spaces } = useSpacesQuery();
  const { data: post } = usePostByIdQuery(postId);

  const isFavorited = post?.favorite && post.favorite.length > 0;

  const handleDeletePost = () => {
    deletePost({ id: postId });
  };

  const handleResolvePost = () => {
    resolvePost({ id: postId });
  };

  const handleUnresolvePost = () => {
    unresolvePost({ id: postId });
  };

  const handleCopyLink = () => {
    copyPostLink(pathname);
  };

  const handleMoveToSpace = (spaceId: string) => {
    movePostToSpace({ postId, spaceId });
  };

  const handlePinToSpace = () => {
    pinPostToSpace({ postId, pinned: !post?.pinned });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ id: postId, type: 'post' });
  };

  // Filter out the current space from the list
  // This ensures that the "Move to space" option does not include the current space
  const availableSpaces =
    spaces?.filter((space) => space.id !== post?.spaceId) ?? [];

  const options: PostOption[][] = [
    [
      {
        icon: Icons.bellDot,
        label: 'Subscribe',
      },
      {
        icon: isFavorited ? Icons.starOff : Icons.star,
        label: isFavorited ? 'Remove from favorites' : 'Add to favorites',
        onClick: handleToggleFavorite,
      },
    ],
    [
      ...(availableSpaces.length > 0
        ? [
            {
              icon: Icons.space,
              label: 'Move to space',
              subMenu: availableSpaces.map((space) => ({
                icon: space.icon ? space.icon : '',
                label: space.name,
                onClick: () => handleMoveToSpace(space.id),
              })),
            },
          ]
        : []),
      {
        icon: post?.pinned ? Icons.pinOff : Icons.pin,
        label: post?.pinned ? 'Unpin from space' : 'Pin to space',
        onClick: handlePinToSpace,
      },
      ...(post?.resolvedAt
        ? [
            {
              icon: Icons.circleX,
              label: 'Reopen post',
              onClick: handleUnresolvePost,
            },
          ]
        : [
            {
              icon: Icons.resolve,
              label: 'Resolve post',
              onClick: handleResolvePost,
            },
          ]),
    ].filter(Boolean),
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button
          className={cn('size-7 rounded-sm text-muted-foreground')}
          size={'icon'}
          tooltip="More options"
          variant={'ghost'}
        >
          <Icons.ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 overflow-hidden rounded-lg p-0"
      >
        {options.map((group) => (
          <div
            className="border-b p-1 last:border-none"
            key={`group-${group.map((item) => item.label).join('-')}`}
          >
            {group.map((item) =>
              item.subMenu ? (
                <DropdownMenuSub key={item.label}>
                  <DropdownMenuSubTrigger>
                    {item.icon && (
                      <item.icon className="mr-2 size-4 text-muted-foreground" />
                    )}
                    <span>{item.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    alignOffset={-1}
                    className="w-48"
                    sideOffset={3}
                  >
                    {item.subMenu.map((subItem) => (
                      <DropdownMenuItem
                        className="flex items-center"
                        key={subItem.label}
                        onClick={subItem.onClick}
                      >
                        {subItem.icon ? (
                          <span className="text-xs">{subItem.icon}</span>
                        ) : (
                          <Icons.space />
                        )}
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  className="flex items-center"
                  key={item.label}
                  onClick={item.onClick}
                >
                  {item.icon && <item.icon />}
                  {item.label}
                </DropdownMenuItem>
              )
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
