import { Label } from "@coordinize/ui/components/label";
import { SpaceDetailsForm } from "@/components/settings/spaces/space-details-form";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function SpaceSettingsPage({
  params,
}: {
  params: Promise<{ slug: string; identifier: string }>;
}) {
  const { identifier } = await params;

  prefetch(trpc.space.getById.queryOptions({ id: identifier }));

  return (
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">General</Label>
          <SpaceDetailsForm identifier={identifier} />
        </div>
      </div>
    </HydrateClient>
  );
}
