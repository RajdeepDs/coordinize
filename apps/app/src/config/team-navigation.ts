// Team Navigation - e.g. /settings/teams/[teamId]/[...path]
export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
export function getTeamNavigation(teamId: string, slug: string): NavItem[] {
  return [
    {
      label: "General",
      href: `/${slug}/settings/teams/${teamId}/general`,
      icon: "settings",
    },
    {
      label: "Members",
      href: `/${slug}/settings/teams/${teamId}/members`,
      icon: "members",
    },
  ];
}
