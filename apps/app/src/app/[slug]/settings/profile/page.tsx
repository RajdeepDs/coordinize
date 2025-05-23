import { PreferredNameForm } from "@/components/forms/preferred-name-form";
import { ProfilePic } from "@/components/forms/profile-pic";
import { SettingsCard } from "@/components/settings/settings-card";
import { ChangeEmailDialog } from "@/components/ui/change-email-dialog";
import { ChangePasswordDialog } from "@/components/ui/change-password-dialog";
import { HydrateClient, getQueryClient, trpc } from "@/trpc/server";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default async function ProfilePage() {
  const queryClient = getQueryClient();
  const user = await queryClient.fetchQuery(trpc.user.me.queryOptions());

  if (!user) {
    return null;
  }

  return (
    <HydrateClient>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">General</Label>
          <SettingsCard
            title="Profile picture"
            className="flex-col items-start"
          >
            {user && <ProfilePic user={user} />}
          </SettingsCard>
          <SettingsCard
            title="Preferred name"
            description="You can use a nickname or your real name—whatever feels right to you."
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
          >
            <PreferredNameForm name={user.name} />
          </SettingsCard>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Account security</Label>
          <SettingsCard
            title="Email"
            description={user.email}
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
          >
            <ChangeEmailDialog currentEmail={user.email} />
          </SettingsCard>
          <SettingsCard
            title="Password"
            description={"Change your password to login to your account."}
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
          >
            <ChangePasswordDialog />
          </SettingsCard>
        </div>
      </div>
    </HydrateClient>
  );
}
