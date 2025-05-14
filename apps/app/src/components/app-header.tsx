"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { pageTabs } from "@/config/page-tabs";
import { Button } from "@coordinize/ui/components/button";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";
import { SidebarTrigger } from "@coordinize/ui/components/sidebar";
import { useSidebar } from "@coordinize/ui/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@coordinize/ui/components/tabs";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";

import { useSlidingSidebarStore } from "@/store/sliding-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@coordinize/ui/components/select";

export function AppHeader() {
  const { isMobile, state } = useSidebar();
  const { isOpen, setIsOpen } = useSlidingSidebarStore();

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
    <header className="my-2 flex h-9 items-center justify-between">
      <div className="flex h-full items-center gap-2">
        <div
          className={cn(
            "flex h-full items-center gap-2",
            isMobile || state === "collapsed" ? "flex" : "hidden",
          )}
        >
          <SidebarTrigger className="size-9 text-muted-foreground" />
          <Separator orientation="vertical" className="max-h-5" />
        </div>

        <Label className="mx-2 font-normal">
          {currentPage?.page ?? "Home"}
        </Label>
        {isMobile ? (
          <>{tabsWithSlug.length > 0 && <HeaderSelect tabs={tabsWithSlug} />}</>
        ) : (
          <>{tabsWithSlug.length > 0 && <HeaderTabs tabs={tabsWithSlug} />}</>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn("text-muted-foreground")}
        >
          <Icons.bell />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "text-muted-foreground",
            isOpen && "bg-muted text-primary",
          )}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Icons.panelRight />
        </Button>
      </div>
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
            className="border-border font-normal text-muted-foreground data-[state=active]:bg-muted data-[state=active]:font-medium data-[state=active]:text-foreground data-[state=active]:shadow-none dark:text-muted-foreground"
            asChild
          >
            <Link href={tab.href}>{tab.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default function HeaderSelect({
  tabs,
}: { tabs: { name: string; href: string }[] }) {
  return (
    <Select defaultValue={tabs.at(0)?.href}>
      <SelectTrigger className="h-8">
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
