import { SettingsCard } from "@/components/settings/settings-card";
import InterfaceSelect from "@/components/ui/interface-select";
import { Label } from "@coordinize/ui/components/label";

export default function PreferencesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Preferences</Label>
        <SettingsCard
          title="Interface theme"
          description="Select or customize your interface color scheme."
          className="flex-col items-start"
        >
          <InterfaceSelect />
        </SettingsCard>
      </div>
    </div>
  );
}
