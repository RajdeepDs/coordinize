import { SettingsCard } from "@/components/settings/settings-card";
import { getUser } from "@/queries/cached-queries";
import { Button } from "@coordinize/ui/components/button";
import { Input } from "@coordinize/ui/components/input";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default async function ProfilePage() {
  const user = await getUser();
  console.log(user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">General</Label>
        <SettingsCard title="Profile picture" className="flex-col items-start">
          <div className="size-16 bg-muted border rounded-sm" />
        </SettingsCard>
        <SettingsCard
          title="Preferred name"
          description="You can use a nickname or your real name—whatever feels right to you."
        >
          <Input
            placeholder={"Enter your name"}
            className="w-52 bg-muted placeholder:text-foreground"
          />
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
