import { ActivitySection } from "@/components/activity/activity-section";
import { AppHeader } from "@/components/app-header";
import { TeamsSidebar } from "@/components/teams-sidebar";
import { Label } from "@coordinize/ui/components/label";
import { Separator } from "@coordinize/ui/components/separator";

export default function Home() {
  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <AppHeader />
        <ActivitySection>
          {/* Day separator */}
          <div className="flex w-full items-center gap-2">
            <Label className="font-normal text-muted-foreground">Today</Label>
            <Separator className="flex-1 data-[orientation=horizontal]:w-full" />
          </div>
          {/* List of posts */}
          {/* The post contains - post created user image, title, latest comment and space label */}
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
