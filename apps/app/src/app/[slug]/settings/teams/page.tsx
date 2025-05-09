import { TeamsTable } from "@/components/ui/teams-table";
import { getTeams } from "@/queries/cached-queries";
import { Label } from "@coordinize/ui/components/label";

export default async function TeamsPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const teams = await getTeams();

  if (!teams) {
    return <>Loading...</>;
  }

  const { slug } = await params;
  const createTeamHref = `/${slug}/settings/new-team`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Teams</Label>
        <TeamsTable data={teams} slug={createTeamHref} />
      </div>
    </div>
  );
}
