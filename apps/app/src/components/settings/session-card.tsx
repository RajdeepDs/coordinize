"use client";

import { authClient } from "@coordinize/auth/auth-client";
import type { Session } from "@coordinize/database/db";
import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/lib/icons";
import { redirect } from "next/navigation";
import { UAParser } from "ua-parser-js";

interface SessionCardProps {
  readonly session: Session & {
    isCurrent: boolean;
  };
}

export function SessionCard({ session }: SessionCardProps) {
  const parsed = new UAParser(session.userAgent ?? "");
  const browser = parsed.getBrowser().name ?? "Unknown Browser";
  const os = parsed.getOS().name ?? "Unknown OS";

  return (
    <div className="group flex w-full cursor-pointer items-center justify-between rounded-md border p-3">
      <div className="flex items-center gap-4">
        <Button variant={"secondary"} size={"icon"}>
          <Icons.monitor className="size-4" />
        </Button>
        <div className="flex flex-col">
          <h3 className="text-sm ">
            {browser} on {os}
          </h3>
          {session.isCurrent ? (
            <p className="flex items-center gap-1 text-green-700 text-sm">
              <span className="size-1.5 rounded-full bg-green-600" />
              Current session
            </p>
          ) : (
            <p>Last active {new Date(session.updatedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="hidden cursor-pointer font-normal group-hover:block"
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/private-beta");
              },
            },
          });
        }}
      >
        Log out
      </Button>
    </div>
  );
}
