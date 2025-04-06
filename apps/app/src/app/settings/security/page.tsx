import { SessionCard } from "@/components/settings/session-card";
import { SettingsCard } from "@/components/settings/settings-card";
import {
  getSession as getCurrentSession,
  getSessions,
} from "@/queries/cached-queries";
import { Button } from "@coordinize/ui/components/button";
import { Label } from "@coordinize/ui/components/label";

export default async function SecurityPage() {
  const currentSession = await getCurrentSession();
  const sessions = await getSessions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Security & Access</Label>
        <SettingsCard
          title="Session"
          description="Devices logged into your account."
          className="flex-col items-start"
        >
          <div className="mt-2 flex flex-col gap-2 w-full">
            {sessions?.map((session) => (
              <SessionCard
                key={session.id}
                session={{
                  ...session,
                  ipAddress: session?.ipAddress ?? null,
                  userAgent: session?.userAgent ?? null,
                  isCurrent: session?.id === currentSession?.id,
                }}
              />
            ))}
          </div>
        </SettingsCard>
      </div>
      <SettingsCard
        title="Log out of all devices"
        description="Log out of all other active sessions on other devices besides this one."
      >
        <Button
          variant={"outline"}
          size={"sm"}
          className="font-normal cursor-pointer"
        >
          Log out of all devices{" "}
        </Button>
      </SettingsCard>
    </div>
  );
}
