import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostHeader } from '@/components/layout/post/post-header';

const Data = {
  space: 'Engineering',
  post: {
    id: '123',
    title: `What we're working on`,
    desription:
      "Hello everyone! I appreciate you all being here today. I'm excited to share some insights into our current projects and the roadmap ahead. We have several initiatives lined up that aim to enhance our platform and improve user experience. From new features to performance upgrades, our team is dedicated to delivering value. Let's dive into the details and discuss how these developments will impact our community!",
  },
} as const;

export default function PostPage() {
  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <PostHeader space={Data.space} title={Data.post.title} />
        <ActivitySection>Hello</ActivitySection>
      </div>
    </div>
  );
}
