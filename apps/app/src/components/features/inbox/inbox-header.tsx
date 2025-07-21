import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';

export function InboxHeader() {
  return (
    <div className="flex min-h-10 items-center justify-between pr-1.5 pl-3">
      <Label className="font-normal text-foreground text-sm">Inbox</Label>
      <Button
        className={cn('size-7 rounded-sm text-muted-foreground')}
        size={'icon'}
        tooltip="Notifications"
        variant={'ghost'}
      >
        <Icons.listFilter />
      </Button>
    </div>
  );
}
