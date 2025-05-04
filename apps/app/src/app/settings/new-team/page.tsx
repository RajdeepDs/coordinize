import { SettingsCard } from "@/components/settings/settings-card";
import { Label } from "@coordinize/ui/components/label";

export default function NewTeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Add team</Label>
        <SettingsCard
          title="Create a new team"
          description="Create a new team to organize collaboration around a specific project, topic, or function."
        />
      </div>
    </div>
  );
}
