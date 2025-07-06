import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostHeader } from '@/components/layout/post/post-header';
import { PostMetadata } from '@/components/layout/post/post-metadata';
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

  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        {post ? (
          <>
            <PostHeader space={post.space.name} title={post.title} />
            <ActivitySection>
              <PostMetadata
                createdAt={post.createdAt}
                userImage={post.author.image || ''}
                userName={post.author.name}
              />
            </ActivitySection>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-ui-gray-900">Post not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
