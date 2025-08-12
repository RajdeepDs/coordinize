import { PostSection } from '@/components/features/post';
import { SpaceSection } from '@/components/features/space';
import { TimelineSection } from '@/components/features/timeline';
import { HeroSection } from '@/components/hero';

export default function Home() {
  return (
    <div className="my-20">
      <HeroSection />
      <div className="mx-auto mt-20 grid grid-cols-1 divide-y border-y md:max-w-xl lg:max-w-5xl lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="content-end px-4 py-12 sm:p-12">
          <PostSection />
        </div>
        <div className="content-end px-4 py-12 sm:p-12">
          <SpaceSection />
        </div>
      </div>
      <div className="mx-auto content-end border-b px-4 py-12 sm:p-12 md:max-w-xl lg:max-w-5xl">
        <TimelineSection />
      </div>
    </div>
  );
}
