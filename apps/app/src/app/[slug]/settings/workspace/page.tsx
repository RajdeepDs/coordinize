import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';
import { SettingsCard } from '@/components/settings/settings-card';
import DeleteWorkspaceDialog from '@/components/settings/workspace/delete-workspace-dialog';
import { WorkspaceLogo } from '@/components/settings/workspace/workspace-logo';
import { WorkspaceNameSlug } from '@/components/settings/workspace/workspace-name-slug';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';

export default async function WorkspacePage() {
  const queryClient = getQueryClient();
  const workspace = await queryClient.fetchQuery(
    trpc.workspace.current.queryOptions()
  );

  if (!workspace) {
    return null;
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Workspace</Label>
          <SettingsCard className="flex-col items-start" title="Logo">
            <WorkspaceLogo workspace={workspace} />
          </SettingsCard>
          <WorkspaceNameSlug workspace={workspace} />
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Danger zone</Label>
          {/* TODO: add delete workspace functionality and redirect to create a new workspace. */}
          <SettingsCard
            className="flex-col items-start sm:flex-row sm:justify-between"
            description="This will permanently delete your workspace and all its data. This action cannot be undone."
            title="Delete workspace"
          >
            <DeleteWorkspaceDialog
              workspaceId={workspace.id}
              workspaceName={workspace.name}
            />
          </SettingsCard>
        </div>
      </div>
    </HydrateClient>
  );
}
