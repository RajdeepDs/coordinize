import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';
import { cn } from '@coordinize/ui/lib/utils';

interface PostSeparatorProps {
  label: string;
}

export function PostSeparator({ label }: PostSeparatorProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <Label
        className={cn(
          'font-normal text-muted-foreground',
          label === 'Pinned' && 'text-foreground'
        )}
      >
        {label}
      </Label>
      <Separator className="flex-1 data-[orientation=horizontal]:w-full" />
    </div>
  );
}
