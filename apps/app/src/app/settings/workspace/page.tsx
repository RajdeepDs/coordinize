import { PreferredNameForm } from "@/components/forms/preferred-name-form";
import { SettingsCard } from "@/components/settings/settings-card";
import { getCurrentWorkspace } from "@/queries/cached-queries";
import AvatarUploader from "@coordinize/ui/components/avatar-uploader";
import { Button } from "@coordinize/ui/components/button";
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
          <AvatarUploader />
        </SettingsCard>
        <SettingsCard
          title="Name"
          description="You can use your organization or company name here. Keep it simple."
          className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
        >
          <PreferredNameForm name={workspace.name} />
        </SettingsCard>
        <SettingsCard
          title="URL"
          description="This is your workspace's unique URL that members will use to access it."
          className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
        >
          <PreferredNameForm name={workspace.slug} />
        </SettingsCard>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Danger zone</Label>
        <SettingsCard
          title="Delete workspace"
          description="This will permanently delete your workspace and all its data. This action cannot be undone."
        >
          <Button
            variant={"outline"}
            size={"sm"}
            className="border-destructive-foreground font-normal text-destructive-foreground hover:bg-destructive/10 hover:text-destructive-foreground"
          >
            Delete workspace
          </Button>
        </SettingsCard>
      </div>
    </div>
  );
}
