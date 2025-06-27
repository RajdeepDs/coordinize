import { Label } from '@coordinize/ui/components/label';
import { CreateNewSpaceForm } from '@/components/settings/new-space/create-new-space';

export default function NewSpacePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="text-muted-foreground">Create a new space</Label>
        <CreateNewSpaceForm />
      </div>
    </div>
  );
}
