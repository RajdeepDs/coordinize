export type NavItem = {
  title: string;
  href: string;
  icon: string;
  tooltip?: string;
  tooltipShortcut?: string;
  conditional?: boolean;
};

export const appSidebarNav = (slug: string): NavItem[] => [
  {
    title: 'Home',
    href: `/${slug}`,
    icon: 'home',
    tooltip: 'Go to Home',
    tooltipShortcut: 'g+h',
  },
  {
    title: 'Inbox',
    href: `/${slug}/inbox`,
    icon: 'inbox',
    tooltip: 'Go to Inbox',
    tooltipShortcut: 'g+i',
  },
  {
    title: 'Drafts',
    href: `/${slug}/drafts`,
    icon: 'draft',
    tooltip: 'Go to Drafts',
    tooltipShortcut: 'g+d',
    conditional: true,
  },
];
