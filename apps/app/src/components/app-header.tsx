"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { pageTabs } from "@/config/page-tabs";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";
import { SidebarTrigger } from "@coordinize/ui/components/sidebar";
import { useSidebar } from "@coordinize/ui/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@coordinize/ui/components/tabs";

export function AppHeader() {
  const { isMobile } = useSidebar();

  const pathname = usePathname();
  const { slug } = useParams<{ slug: string }>();

  // Find the current page's tabs and label
  const currentPage = pageTabs.find((tab) => {
    switch (tab.page) {
      case "Home":
        return pathname === `/${slug}`;
      default:
        return false;
    }
  });

  // If there are tabs, replace :slug with actual slug
  const tabsWithSlug =
    currentPage?.tabs?.map((tab) => ({
      ...tab,
      href: tab.href.replace(":slug", slug as string),
    })) ?? [];

  return (
    <header className="my-2 flex h-9 items-center">
      <div className="flex h-full items-center gap-2">
        {isMobile && (
          <>
            <SidebarTrigger className="h-9 text-muted-foreground" />
            <Separator orientation="vertical" className="max-h-5" />
          </>
        )}
        <Label className="mx-2 font-normal">
          {currentPage?.page ?? "Home"}
        </Label>
      </div>
      {tabsWithSlug.length > 0 && <HeaderTabs tabs={tabsWithSlug} />}
    </header>
  );
}

function HeaderTabs({ tabs }: { tabs: { name: string; href: string }[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.href ?? ""} className="items-center">
      <TabsList className="gap-2 bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            className="border-border text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none dark:text-muted-foreground"
            asChild
          >
            <Link href={tab.href}>{tab.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
