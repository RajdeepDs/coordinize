import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';

interface DaySeparatorProps {
  label: string;
}

export function DaySeparator({ label }: DaySeparatorProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <Label className="font-normal text-muted-foreground">{label}</Label>
      <Separator className="flex-1 data-[orientation=horizontal]:w-full" />
    </div>
  );
}
