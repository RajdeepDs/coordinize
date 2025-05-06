import { MembersTable } from "@/components/ui/members-table";
import { getWorkspaceMembers } from "@/queries/cached-queries";
import { Label } from "@coordinize/ui/components/label";

export default async function MembersPage() {
  const members = await getWorkspaceMembers();

  if (!members) {
    return <div>Loading...</div>;
  }

  const data = members.map((member) => {
    return {
      imageSrc: member.user?.image,
      name: member.user?.name,
      email: member.user?.email,
      status: member.role,
      joinedAt: member.joinedAt,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Members</Label>
        <MembersTable data={data} />
      </div>
    </div>
  );
}
