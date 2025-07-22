import { Label } from '@coordinize/ui/components/label';
import { InboxFilter } from './inbox-filter';

export function InboxHeader() {
  return (
    <div className="flex min-h-10 items-center justify-between pr-1.5 pl-3">
      <Label className="font-normal text-foreground text-sm">Inbox</Label>
      <InboxFilter />
    </div>
  );
}
