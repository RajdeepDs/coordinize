'use client';

import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@coordinize/ui/components/select';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@coordinize/ui/components/tabs';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { pageTabs } from '@/config/page-tabs';

export function AppHeader() {
  const { isMobile, state } = useSidebar();
  const pathname = usePathname();
  const { slug } = useParams<{ slug: string }>();

  // Find the current page's tabs and label
  const currentPage = pageTabs.find((tab) => {
    switch (tab.page) {
      case 'Home':
        return pathname === `/${slug}`;
      default:
        return false;
    }
  });

  // If there are tabs, replace :slug with actual slug
  const _tabsWithSlug =
    currentPage?.tabs?.map((tab) => ({
      ...tab,
      href: tab.href.replace(':slug', slug as string),
    })) ?? [];

  return (
    <header className="flex items-center justify-between px-2 py-1">
      <div className="flex h-full items-center gap-2">
        <div
          className={cn(
            'flex h-full items-center',
            isMobile || state === 'collapsed' ? 'flex' : 'hidden'
          )}
        >
          <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
        </div>

        <Label className="font-normal">{currentPage?.page ?? 'Home'}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className={cn('size-7 rounded-sm text-muted-foreground')}
          size={'icon'}
          variant={'ghost'}
        >
          <Icons.bell />
        </Button>
      </div>
    </header>
  );
}

// TODO: Implement HeaderTabs and HeaderSelect
function _HeaderTabs({ tabs }: { tabs: { name: string; href: string }[] }) {
  return (
    <Tabs className="items-center" defaultValue={tabs[0]?.href ?? ''}>
      <TabsList className="h-7 gap-2 bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            asChild
            className="h-7 border-border font-normal text-muted-foreground data-[state=active]:bg-muted data-[state=active]:font-medium data-[state=active]:text-foreground data-[state=active]:shadow-none dark:text-muted-foreground"
            key={tab.href}
            value={tab.href}
          >
            <Link href={tab.href}>{tab.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function _HeaderSelect({ tabs }: { tabs: { name: string; href: string }[] }) {
  return (
    <Select defaultValue={tabs.at(0)?.href}>
      <SelectTrigger className="h-7">
        <SelectValue placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent>
        {tabs.map((tab) => (
          <SelectItem key={tab.href} value={tab.href}>
            <Link href={tab.href}>{tab.name}</Link>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
