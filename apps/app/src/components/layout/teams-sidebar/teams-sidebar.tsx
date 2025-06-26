'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@coordinize/ui/components/collapsible';
import { Input } from '@coordinize/ui/components/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { useEffect, useState } from 'react';

const onlineMembers = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Steven Tey',
  },
];

export function TeamsSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(onlineMembers);

  useEffect(() => {
    const filtered = onlineMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchQuery]);

  return (
    <div className="hidden h-full xl:flex">
      <div className="h-full w-56">
        <Sidebar
          className="w-full rounded border bg-background"
          collapsible="none"
          side="right"
        >
          <SidebarHeader className="p-0">
            <div className="relative">
              <Input
                className="peer border-none bg-transparent px-0 ps-9 shadow-none focus-visible:ring-0 dark:bg-transparent"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people..."
                type="text"
                value={searchQuery}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                <Icons.search aria-hidden="true" size={16} />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Collapsible className="group/collapsible" defaultOpen>
              <SidebarGroup>
                <div className="flex items-center justify-between">
                  <SidebarGroupLabel>
                    {onlineMembers.length} online
                  </SidebarGroupLabel>
                  <div className="flex items-center gap-1">
                    {/* Add members button */}
                    <button
                      className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      onClick={() => {
                        console.log('Plus button clicked');
                      }}
                      type="button"
                    >
                      <Icons.plus className="h-4 w-4" />
                      <span className="sr-only">Add member</span>
                    </button>

                    <CollapsibleTrigger className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Icons.ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      <span className="sr-only">Toggle members</span>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredMembers.map((member) => (
                        <SidebarMenuItem key={member.id}>
                          <SidebarMenuButton>
                            <div className="flex w-full items-center gap-2">
                              <div className="h-6 w-6 flex-shrink-0 rounded-full border bg-sidebar-accent" />
                              <span className="truncate text-sm">
                                {member.name}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
}
