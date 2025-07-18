import { Avatar, AvatarFallback, AvatarImage } from '@coordinize/ui/avatar';

interface AvatarStatusProps {
  readonly src: string;
  readonly fallback: string;
  readonly alt: string;
  className: string;
  statusShow?: boolean;
}

export default function AvatarStatus({
  src,
  fallback,
  alt,
  className,
  statusShow = true,
}: AvatarStatusProps) {
  return (
    <div className="relative">
      <Avatar className={className}>
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback className="select-none">{fallback}</AvatarFallback>
      </Avatar>
      {statusShow && (
        <span className="-end-0.5 -bottom-0 absolute size-2.5 rounded-full border-2 border-background bg-ui-green-700">
          <span className="sr-only">Online</span>
        </span>
      )}
    </div>
  );
}
