import { AppHeader } from "@/components/app-header";
import { TeamsSidebar } from "@/components/teams-sidebar";

export default function Home() {
  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <AppHeader />
      </div>
      <TeamsSidebar />
    </div>
  );
}
