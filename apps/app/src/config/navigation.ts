export type NavItem = {
  title: string;
  href: string;
  icon: string;
};

export type SidebarSection = {
  title: string;
  items: NavItem[];
};

export const settingsSidebarNav = (slug: string): SidebarSection[] => [
  {
    title: 'Account',
    items: [
      {
        title: 'Preferences',
        href: `/${slug}/settings/preferences`,
        icon: 'home',
      },
      {
        title: 'Profile',
        href: `/${slug}/settings/profile`,
        icon: 'userCircle',
      },
      // {
      //   title: "Notifications",
      //   href: "/settings/notifications",
      //   icon: "bellDot",
      // },
      {
        title: 'Security & Access',
        href: `/${slug}/settings/security`,
        icon: 'sheildUser',
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      {
        title: 'Workspace',
        href: `/${slug}/settings/workspace`,
        icon: 'command',
      },
      {
        title: 'Spaces',
        href: `/${slug}/settings/spaces`,
        icon: 'space',
      },
      {
        title: 'Members',
        href: `/${slug}/settings/members`,
        icon: 'users',
      },
      // {
      //   title: "Billing",
      //   href: "/settings/billing",
      //   icon: "creditCard",
      // },
    ],
  },
];
