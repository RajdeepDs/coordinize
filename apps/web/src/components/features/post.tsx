import { SectionHeader } from "../layout/section-header";

const tagLine = "Asynchronous by design";
const title = "Posts: Your Ideas, Clearly Organized";
const subtitle =
  "Unlock focused discussions and preserve every critical insight for your global team.";

export function PostSection() {
  return (
    <div className="mx-auto flex flex-col gap-6 px-4 pt-24 sm:container">
      <SectionHeader tagLine={tagLine} title={title} subtitle={subtitle} />
      {/* Illustration of Posts */}

      {/* Grids of features */}
    </div>
  );
}
