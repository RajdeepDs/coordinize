export type NavItem = {
  title: string;
  href: string;
  icon: string;
};

export type SidebarSection = {
  title: string;
  items: NavItem[];
};

export const settingsSidebarNav: SidebarSection[] = [
  {
    title: "Account",
    items: [
      {
        title: "Preferences",
        href: "/settings/preferences",
        icon: "home",
      },
      {
        title: "Profile",
        href: "/settings/profile",
        icon: "userCircle",
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: "bellDot",
      },
      {
        title: "Security & Access",
        href: "/settings/security",
        icon: "sheildUser",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Workspace",
        href: "/settings/workspace",
        icon: "command",
      },
      {
        title: "Teams",
        href: "/settings/teams",
        icon: "userSquare",
      },
      {
        title: "Members",
        href: "/settings/members",
        icon: "users",
      },
      {
        title: "Billing",
        href: "/settings/billing",
        icon: "creditCard",
      },
    ],
  },
];
