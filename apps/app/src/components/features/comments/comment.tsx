import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { MarkdownEditor } from '../markdown-editor';

export function Comment() {
  return (
    <div className="mt-4 flex min-h-[6rem] flex-col justify-between rounded-lg bg-background p-3 ring-1 ring-border">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <MarkdownEditor
          containerClasses="px-0"
          placeholder="Add a comment..."
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button size="icon" variant="ghost">
          <Icons.emojiPlus />
        </Button>
        <Button size={'sm'}>Comment</Button>
      </div>
    </div>
  );
}
