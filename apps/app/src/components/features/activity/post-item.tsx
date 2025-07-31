import Link from 'next/link';
import AvatarStatus from '@/components/ui/avatar-status';
import { Dot } from '@/components/ui/dot';
import { stripHtml } from '@/utils/strip-html';

interface PostItemProps {
  id: string;
  title: string;
  description?: string;
  spaceName: string;
  userImage?: string;
  authorName: string;
  workspaceSlug?: string;
}

export function PostItem({
  id,
  title,
  spaceName,
  userImage,
  authorName,
  description,
  workspaceSlug = '',
}: PostItemProps) {
  return (
    <Link href={`/${workspaceSlug}/posts/${id}`}>
      <div className="flex h-12 items-center gap-3 rounded-md px-3 hover:bg-accent">
        <AvatarStatus
          alt={authorName}
          className="size-8"
          fallback={authorName?.charAt(0)}
          src={userImage || ''}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0">
          <div className="flex min-w-0 select-none items-center gap-2">
            <h1 className="truncate font-medium text-[15px]">{title}</h1>
            <Dot className="hidden sm:flex" />
            <p className="hidden truncate font-medium text-[15px] sm:flex">
              {spaceName}
            </p>
          </div>
          <p className="line-clamp-1 text-sm text-ui-gray-900">
            {stripHtml(description || '')}
          </p>
        </div>
      </div>
    </Link>
  );
}
