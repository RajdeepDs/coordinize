// Space Navigation - e.g. /settings/space/[spaceId]/[...path]
export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
export function getSpaceNavigation(spaceId: string, slug: string): NavItem[] {
  return [
    {
      label: "General",
      href: `/${slug}/settings/space/${spaceId}/general`,
      icon: "settings",
    },
    {
      label: "Members",
      href: `/${slug}/settings/space/${spaceId}/members`,
      icon: "members",
    },
  ];
}
