import { headers } from "next/headers";

import { LogOutAllDevices } from "@/components/settings/log-out-all-devices";
import { SessionCard } from "@/components/settings/session-card";
import { SettingsCard } from "@/components/settings/settings-card";
import { auth } from "@coordinize/auth/auth";
import { Label } from "@coordinize/ui/components/label";

export default async function SecurityPage() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Security & Access</Label>
        <SettingsCard
          title="Sessions"
          description="Devices logged into your account."
          className="flex-col items-start"
        >
          {sessions.map((session) => (
            <SessionCard
              session={{
                ...session,
                ipAddress: session.ipAddress ?? null,
                userAgent: session.userAgent ?? null,
                isCurrent: session.id === currentSession?.session?.id,
              }}
              key={session.id}
            />
          ))}
        </SettingsCard>
        <LogOutAllDevices />
      </div>
    </div>
  );
}
