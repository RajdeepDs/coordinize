"use client";

import { authClient } from "@coordinize/auth/auth-client";
import { Button } from "@coordinize/ui/components/button";
import { SettingsCard } from "./settings-card";

export function LogOutAllDevices() {
  return (
    <SettingsCard
      title="Log out of all devices"
      description="Log out of all other active sessions on other devices besides this one."
    >
      <Button
        variant={"outline"}
        size={"sm"}
        className="font-normal cursor-pointer"
        onClick={async () => {
          await authClient.revokeOtherSessions();
        }}
      >
        Log out of all devices{" "}
      </Button>
    </SettingsCard>
  );
}
