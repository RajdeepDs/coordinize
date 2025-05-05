import { TeamsTable } from "@/components/ui/teams-table";
import { dummyTeamData } from "@/config/dummy-team-data";
import { getTeams } from "@/queries/cached-queries";
import { Label } from "@coordinize/ui/components/label";

export default async function TeamsPage() {
  const teams = await getTeams();

  if (!teams) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Teams</Label>
        <TeamsTable data={dummyTeamData} />
      </div>
    </div>
  );
}
