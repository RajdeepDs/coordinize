import { CreateNewTeamForm } from "@/components/settings/create-new-team";
import { Label } from "@coordinize/ui/components/label";

export default function NewTeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Create a new team</Label>
        <CreateNewTeamForm />
      </div>
    </div>
  );
}
