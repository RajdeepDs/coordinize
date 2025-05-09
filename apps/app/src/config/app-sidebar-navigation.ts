export type NavItem = {
  title: string;
  href: string;
  icon: string;
};

export const appSidebarNav = (slug: string): NavItem[] => [
  {
    title: "Home",
    href: `/${slug}`,
    icon: "home",
  },
  {
    title: "Inbox",
    href: `/${slug}/inbox`,
    icon: "inbox",
  },
];
