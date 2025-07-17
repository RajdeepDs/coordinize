import { PostPageContent } from '@/components/features/post/post-page-content';
import { getQueryClient, trpc } from '@/trpc/server';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.post.getPostById.queryOptions({ id }));

  return <PostPageContent postId={id} />;
}
