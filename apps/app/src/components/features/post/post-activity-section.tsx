'use client';

import { Label } from '@coordinize/ui/components/label';
import { Suspense } from 'react';
import { PostTimeline } from '@/components/features/timeline/post-timeline';
import { CommentForm } from '../comments/comment';

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
      {/* Comment Form */}
      <div className="py-4">
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}
