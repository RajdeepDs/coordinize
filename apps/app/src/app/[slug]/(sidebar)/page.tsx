import { ActivitySection } from "@/components/activity/activity-section";
import { TeamsSidebar } from "@/components/teams-sidebar";

export default function Home() {
  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <ActivitySection>Dialog</ActivitySection>
      <TeamsSidebar />
    </div>
  );
}
