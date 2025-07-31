import { Avatar, AvatarFallback, AvatarImage } from '@coordinize/ui/avatar';
import { Icons } from '@coordinize/ui/icons';

interface AvatarStatusProps {
  readonly src: string;
  readonly fallback: string | undefined;
  readonly alt: string;
  className: string;
  statusShow?: boolean;
}

export default function AvatarStatus({
  src,
  fallback = 'A',
  alt,
  className,
  statusShow = true,
}: AvatarStatusProps) {
  return (
    <div className="relative">
      <Avatar className={className}>
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback className="select-none uppercase">
          {fallback?.trim() ? (
            fallback
          ) : (
            <Icons.userCircle className="size-4 text-ui-gray-800" />
          )}
        </AvatarFallback>
      </Avatar>
      {statusShow && (
        <span className="-end-0.5 -bottom-0 absolute size-2.5 rounded-full border-2 border-background bg-ui-green-700">
          <span className="sr-only">Online</span>
        </span>
      )}
    </div>
  );
}
