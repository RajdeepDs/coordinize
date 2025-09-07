import { Label } from "@coordinize/ui/components/label";

import { MembersTable } from "@/components/settings/members/members-table";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export default async function MembersPage() {
  const queryClient = getQueryClient();
  const members = await queryClient.fetchQuery(
    trpc.workspace.members.queryOptions()
  );

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
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Members</Label>
          <MembersTable data={data} />
        </div>
      </div>
    </HydrateClient>
  );
}
