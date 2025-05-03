import { WorkspaceLogo } from "@/components/forms/workspace-logo";
import { SettingsCard } from "@/components/settings/settings-card";
import { WorkspaceNameSlug } from "@/components/settings/workspace-name-slug";
import DeleteWorkspaceDialog from "@/components/ui/delete-workspace-dialog";
import { getCurrentWorkspace } from "@/queries/cached-queries";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default async function WorkspacePage() {
  const workspace = await getCurrentWorkspace();

  if (!workspace) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Workspace</Label>
        <SettingsCard title="Logo" className="flex-col items-start">
          <WorkspaceLogo workspace={workspace} />
        </SettingsCard>
        <WorkspaceNameSlug workspace={workspace} />
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Danger zone</Label>
        {/* TODO: add delete workspace functionality and redirect to create a new workspace. */}
        <SettingsCard
          title="Delete workspace"
          description="This will permanently delete your workspace and all its data. This action cannot be undone."
          className="flex-col items-start sm:flex-row sm:justify-between"
        >
          <DeleteWorkspaceDialog WorkspaceName={workspace.name} />
        </SettingsCard>
      </div>
    </div>
  );
}
