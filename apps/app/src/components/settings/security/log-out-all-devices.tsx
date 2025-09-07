"use client";

import { authClient } from "@coordinize/auth/auth-client";
import { Button } from "@coordinize/ui/components/button";
import { SettingsCard } from "@/components/settings/settings-card";

export function LogOutAllDevices() {
  return (
    <SettingsCard
      className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
      description="Log out of all other active sessions on other devices besides this one."
      title="Log out of all devices"
    >
      <Button
        className="cursor-pointer font-normal"
        onClick={async () => {
          await authClient.revokeOtherSessions();
        }}
        size={"sm"}
        variant={"outline"}
      >
        Log out of all devices{" "}
      </Button>
    </SettingsCard>
  );
}
