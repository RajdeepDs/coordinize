import { Label } from '@coordinize/ui/components/label';

import { MembersTable } from '@/components/settings/members/members-table';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';

export default async function SpaceMembersPage({
  params,
}: {
  params: Promise<{ slug: string; identifier: string }>;
}) {
  const { slug: _slug, identifier } = await params;

  const queryClient = getQueryClient();
  const spaceMembers = await queryClient.fetchQuery(
    trpc.space.getMembersBySpaceId.queryOptions({ id: identifier })
  );

  if (!spaceMembers) {
    return <div>Loading...</div>;
  }

  const data = spaceMembers.map((member) => {
    return {
      imageSrc: member.user?.image,
      name: member.user?.name,
      email: member.user?.email,
      status: member.role,
      joinedAt: member.joined,
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
