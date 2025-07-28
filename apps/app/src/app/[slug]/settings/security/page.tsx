import { auth } from '@coordinize/auth/auth';
import { Label } from '@coordinize/ui/components/label';
import { headers } from 'next/headers';
import { LogOutAllDevices } from '@/components/settings/security/log-out-all-devices';
import { SessionsList } from '@/components/settings/security/sessions-list';
import { SettingsCard } from '@/components/settings/settings-card';

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
          className="flex-col items-start"
          description="Devices logged into your account."
          title="Sessions"
        >
          <SessionsList
            initialSessions={sessions.map((session) => ({
              ...session,
              ipAddress: session.ipAddress ?? null,
              userAgent: session.userAgent ?? null,
              isCurrent: session.id === currentSession?.session?.id,
            }))}
          />
        </SettingsCard>
        <LogOutAllDevices />
      </div>
    </div>
  );
}
