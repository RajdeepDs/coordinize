import Image from "next/image";

import { PreferredNameForm } from "@/components/form/preferred-name-form";
import { SettingsCard } from "@/components/settings/settings-card";
import { getUser } from "@/queries/cached-queries";
import { Button } from "@coordinize/ui/components/button";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">General</Label>
        <SettingsCard title="Profile picture" className="flex-col items-start">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              className="size-16 border rounded-sm"
            />
          ) : (
            <div className="text-4xl select-none items-center justify-center flex size-16 bg-muted border rounded-sm">
              {user?.name.at(0)}
            </div>
          )}
        </SettingsCard>
        <SettingsCard
          title="Preferred name"
          description="You can use a nickname or your real name—whatever feels right to you."
        >
          <PreferredNameForm user={user!} />
        </SettingsCard>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Account security</Label>
        <SettingsCard title="Email" description={user?.email}>
          <Button variant={"outline"} size={"sm"} className="font-normal">
            Change email
          </Button>
        </SettingsCard>
        <SettingsCard
          title="Password"
          description={"Change your password to login to your account."}
        >
          <Button variant={"outline"} size={"sm"} className="font-normal">
            Change password
          </Button>
        </SettingsCard>
      </div>
    </div>
  );
}
