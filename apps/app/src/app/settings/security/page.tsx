import { SessionCard } from "@/components/settings/session-card";
import {
  getSession as getCurrentSession,
  getSessions,
} from "@/queries/cached-queries";
import { Label } from "@coordinize/ui/components/label";

export default async function SecurityPage() {
  const currentSession = await getCurrentSession();
  const sessions = await getSessions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Label className="text-muted-foreground">Sessions</Label>
        <p className="select-none text-sm text-muted-foreground">
          Devices logged into your account.
        </p>
        <div className="mt-2 flex flex-col gap-2">
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
      </div>
    </div>
  );
}
