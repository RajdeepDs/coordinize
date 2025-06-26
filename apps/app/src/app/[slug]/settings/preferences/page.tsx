import { Label } from '@coordinize/ui/components/label';
import InterfaceSelect from '@/components/settings/preferences/interface-select';
import { SettingsCard } from '@/components/settings/settings-card';

export default function PreferencesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Preferences</Label>
        <SettingsCard
          className="flex-col items-start"
          description="Select or customize your interface color scheme."
          title="Interface theme"
        >
          <InterfaceSelect />
        </SettingsCard>
      </div>
    </div>
  );
}
