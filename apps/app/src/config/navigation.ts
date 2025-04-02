export type NavItem = {
  title: string;
  href: string;
  icon: string;
  requiresAdmin?: boolean;
};

export type SidebarSection = {
  title: string;
  items: NavItem[];
};

export const settingsSidebar: SidebarSection[] = [
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
        title: "Security",
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
        requiresAdmin: true,
      },
      {
        title: "Teams",
        href: "/settings/teams",
        icon: "userSquare",
        requiresAdmin: true,
      },
      {
        title: "Members",
        href: "/settings/members",
        icon: "users",
        requiresAdmin: true,
      },
      {
        title: "Billing",
        href: "/settings/billing",
        icon: "creditCard",
        requiresAdmin: true,
      },
    ],
  },
];
