'use client';

import { Label } from '@coordinize/ui/components/label';
import { Suspense } from 'react';
import { Comment } from '@/components/features/comments/comment';
import { PostTimeline } from '@/components/features/post/post-timeline';

interface PostActivitySectionProps {
  postId: string;
}

function LoadingFallback() {
  return (
    <div className="text-muted-foreground text-sm">Loading activity...</div>
  );
}

export function PostActivitySection({ postId }: PostActivitySectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label>Activity</Label>
      <Suspense fallback={<LoadingFallback />}>
        <PostTimeline postId={postId} />
      </Suspense>
      <Comment />
    </div>
  );
}
