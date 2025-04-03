"use client";

import { useParams } from "next/navigation";
import type React from "react";

import BillingPage from "../billing/page";
import MembersPage from "../members/page";
import NotificationPage from "../notifications/page";
import PreferencesPage from "../preferences/page";
import ProfilePage from "../profile/page";
import SecurityPage from "../security/page";
import TeamsPage from "../teams/page";
import WorkspacePage from "../workspace/page";

const settingsPages: Record<string, React.ComponentType> = {
  preferences: PreferencesPage,
  profile: ProfilePage,
  notifications: NotificationPage,
  security: SecurityPage,
  workspace: WorkspacePage,
  teams: TeamsPage,
  members: MembersPage,
  billing: BillingPage,
};

export default function SettingsPage() {
  const params = useParams();
  const section = params.settings?.[0] || "preferences";

  const SettingsComponent = settingsPages[section];

  if (!SettingsComponent) {
    return <>Page Not Found!</>;
  }

  return <SettingsComponent />;
}
