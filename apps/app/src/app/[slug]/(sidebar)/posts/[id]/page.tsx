import { PostPageContent } from '@/components/features/post/post-page-content';
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
      <div className="flex h-full items-center justify-center">
        <p className="text-ui-gray-900">Post not found.</p>
      </div>
    );
  }

  return <PostPageContent post={post} />;
}
