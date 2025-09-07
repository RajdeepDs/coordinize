"use client";

import type { Session } from "@coordinize/database/db";
import { useState } from "react";
import { SessionCard } from "@/components/settings/security/session-card";

type SessionsListProps = {
  readonly initialSessions: Array<
    Session & {
      isCurrent: boolean;
    }
  >;
};

export function SessionsList({ initialSessions }: SessionsListProps) {
  const [sessions, setSessions] = useState(initialSessions);

  const handleSessionRevoked = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  return (
    <>
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          onSessionRevoked={handleSessionRevoked}
          session={session}
        />
      ))}
    </>
  );
}
