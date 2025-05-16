import { ActivitySection } from "@/components/activity/activity-section";
import { TeamsSidebar } from "@/components/teams-sidebar";
import { PostInputDialog } from "@/components/ui/post-input-dialog";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default function Home() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-1">
        <ActivitySection>
          <PostInputDialog />
          {/* Day separator */}
          <div className="flex w-full items-center gap-2">
            <Label className="font-normal text-muted-foreground">Today</Label>
            <Separator className="flex-1 data-[orientation=horizontal]:w-full" />
          </div>
          {/* List of Posts */}
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
