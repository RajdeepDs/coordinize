import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';
import { ChangeEmailDialog } from '@/components/settings/profile/change-email-dialog';
import { ChangePasswordDialog } from '@/components/settings/profile/change-password-dialog';
import { PreferredNameForm } from '@/components/settings/profile/preferred-name-form';
import { ProfilePic } from '@/components/settings/profile/profile-pic';
import { SettingsCard } from '@/components/settings/settings-card';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';

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
            className="flex-col items-start"
            title="Profile picture"
          >
            {user && <ProfilePic user={user} />}
          </SettingsCard>
          <SettingsCard
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
            description="You can use a nickname or your real name—whatever feels right to you."
            title="Preferred name"
          >
            <PreferredNameForm name={user.name} />
          </SettingsCard>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Label className="text-muted-foreground">Account security</Label>
          <SettingsCard
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
            description={user.email}
            title="Email"
          >
            <ChangeEmailDialog currentEmail={user.email} />
          </SettingsCard>
          <SettingsCard
            className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
            description={'Change your password to login to your account.'}
            title="Password"
          >
            <ChangePasswordDialog />
          </SettingsCard>
        </div>
      </div>
    </HydrateClient>
  );
}
