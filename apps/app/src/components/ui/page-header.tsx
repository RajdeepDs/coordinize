"use client";

import { settingsSidebarNav } from "@/config/navigation";
import { Icons } from "@coordinize/ui/lib/icons";
import { usePathname } from "next/navigation";

export function PageHeader() {
  const pathname = usePathname();

  const currentItem = settingsSidebarNav
    .flatMap((section) => section.items)
    .find((item) => item.href === pathname);

  if (!currentItem) return null;

  const Icon = Icons[currentItem.icon as keyof typeof Icons];

  return (
    <div className="flex items-center gap-2">
      {/* {Icon && <Icon className="size-4 text-muted-foreground" />} */}
      <span className="text-accent-foreground text-xl">
        {currentItem.title}
      </span>
    </div>
  );
}
