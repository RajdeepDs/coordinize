import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostHeader } from '@/components/layout/post/post-header';
import { getQueryClient, trpc } from '@/trpc/server';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();
  const post = await queryClient.fetchQuery(
    trpc.post.getPostById.queryOptions({ id })
  );

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Post not found.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <PostHeader space={post.space.name} title={post.title} />
        <ActivitySection>Hello</ActivitySection>
      </div>
    </div>
  );
}
