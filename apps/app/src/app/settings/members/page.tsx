import { MembersTable } from "@/components/ui/members-table";
import { dummyMembersData } from "@/config/dummy-team-data";
import { Label } from "@coordinize/ui/components/label";

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Members</Label>
        <MembersTable data={dummyMembersData} />
      </div>
    </div>
  );
}
