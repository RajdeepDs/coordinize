"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@coordinize/ui/components/collapsible";
import { Input } from "@coordinize/ui/components/input";
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
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";
import { useEffect, useState } from "react";

const onlineMembers = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Steven Tey",
  },
];

export function TeamsSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(onlineMembers);

  useEffect(() => {
    const filtered = onlineMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMembers(filtered);
  }, [searchQuery]);

  return (
    <div className="absolute top-0 right-0 h-full w-full">
      <Sidebar collapsible="none" className="w-full border-l" side="right">
        <SidebarHeader>
          <div className="relative">
            <Input
              className="peer border-none px-0 ps-9 shadow-none focus-visible:ring-0"
              placeholder="Search people..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
              <Icons.search size={16} aria-hidden="true" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <div className="flex items-center justify-between">
                <SidebarGroupLabel>
                  {onlineMembers.length} online
                </SidebarGroupLabel>
                <div className="flex items-center gap-1">
                  {/* Add members button */}
                  <button
                    type="button"
                    className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    onClick={() => {
                      console.log("Plus button clicked");
                    }}
                  >
                    <Icons.plus className="h-4 w-4" />
                    <span className="sr-only">Add member</span>
                  </button>

                  {/* Collapsible trigger button */}
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
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full border bg-sidebar-accent" />
                            <span className="text-sm">{member.name}</span>
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
  );
}
