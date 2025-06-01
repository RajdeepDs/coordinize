"use client";

import { redirect } from "next/navigation";

import { Header } from "@/components/layout/header";
import { authClient } from "@coordinize/auth/auth-client";
import { Button } from "@coordinize/ui/components/button";

export function OnboardingHeader() {
  return (
    <Header>
      <Button
        size={"sm"}
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/private-beta");
              },
            },
          })
        }
      >
        Log out
      </Button>
    </Header>
  );
}
