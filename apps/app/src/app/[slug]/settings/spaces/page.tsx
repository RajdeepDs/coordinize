import { Label } from "@coordinize/ui/components/label";
import { SpacesTable } from "@/components/settings/spaces/spaces-table";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const queryClient = getQueryClient();

  const spaces = await queryClient.fetchQuery(trpc.space.getAll.queryOptions());

  if (!spaces) {
    return "Loading...";
  }

  const { slug } = await params;
  const createTeamHref = `/${slug}/settings/new-space`;

  return (
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Spaces</Label>
          <SpacesTable data={spaces} slug={createTeamHref} />
        </div>
      </div>
    </HydrateClient>
  );
}
