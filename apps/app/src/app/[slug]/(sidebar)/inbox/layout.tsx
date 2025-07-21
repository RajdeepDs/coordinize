import { InboxHeader } from '@/components/features/inbox/inbox-header';
import { InboxItem } from '@/components/features/inbox/inbox-item';

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full gap-1">
      <aside className="w-[24rem] space-y-2 rounded border bg-background">
        <InboxHeader />
        <InboxItem />
      </aside>
      <main className="hidden flex-1 rounded border bg-background sm:flex">
        {children}
      </main>
    </div>
  );
}
