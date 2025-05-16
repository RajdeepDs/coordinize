import { TeamsSidebar } from "@/components/teams-sidebar";

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <div className="flex-1">App</div>
      <div className="relative flex h-full min-w-52 overflow-hidden">
        <TeamsSidebar />
      </div>
    </div>
  );
}
