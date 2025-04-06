import { SettingsCard } from "@/components/settings/settings-card";
import { Label } from "@coordinize/ui/components/label";
import { ThemeSelect } from "@coordinize/ui/theme-select";

export default function PreferencesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Preferences</Label>
        <SettingsCard
          title="Appearance"
          description="Select to customize your theme."
        >
          <ThemeSelect />
        </SettingsCard>
      </div>
    </div>
  );
}
