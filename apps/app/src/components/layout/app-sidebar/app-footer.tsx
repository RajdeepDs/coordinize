import { Button } from '@coordinize/ui/components/button';
import {
  SidebarMenu,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AvatarStatus from '@/components/ui/avatar-status';
import { EmojiPickerPopover } from '@/components/ui/emoji-picker';
import { HelpInfo } from '@/components/ui/help-info';

interface AppFooterProps {
  user: {
    name: string;
    image: string | null;
    statusEmoji: string | null;
  };
}

export function AppFooter({ user }: AppFooterProps) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href={`/${slug}/settings/profile`}>
            <AvatarStatus
              alt="user-image"
              className="size-6 ring-ui-gray-500 ring-offset-1 ring-offset-sidebar transition-all duration-200 ease-in-out hover:ring-2"
              fallback={user.name.at(0)?.toUpperCase() ?? 'A'}
              src={user.image ?? ''}
            />
          </Link>
          <EmojiPickerPopover statusEmoji={user.statusEmoji || ''} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            className="size-7 rounded-sm text-muted-foreground"
            disabled
            size={'icon'}
            variant={'ghost'}
          >
            <Icons.archive />
          </Button>
          <HelpInfo />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
