import { ActivitySection } from "@/components/activity/activity-section";
import { TeamsSidebar } from "@/components/teams-sidebar";
import { PostInputDialog } from "@/components/ui/post-input-dialog";

export default function Home() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-1">
        <ActivitySection>
          <PostInputDialog />
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
