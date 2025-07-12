'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { toast } from '@coordinize/ui/components/sonner';
import { Icons } from '@coordinize/ui/lib/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTRPC } from '@/trpc/client';

export function PostSidebarActions({ postId }: { postId: string }) {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => {
        toast.success('Post deleted successfully.');
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        router.push('/home');
      },
    })
  );

  const { mutate: resolvePost } = useMutation(
    trpc.post.resolve.mutationOptions({
      onSuccess: () => {
        toast.success('Post resolved successfully.');
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        router.push('/home');
      },
    })
  );

  const { mutate: archivePost } = useMutation(
    trpc.post.archive.mutationOptions({
      onSuccess: () => {
        toast.success('Post archived successfully.');
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        router.push('/home');
      },
    })
  );

  function handleDelete() {
    deletePost({ id: postId });
  }

  function handleResolve() {
    resolvePost({ id: postId });
  }

  function handleArchive() {
    archivePost({ id: postId });
  }

  return (
    <SidebarGroup className="pl-0">
      <SidebarMenu>
        <SidebarMenuItem onClick={() => handleResolve()}>
          <SidebarMenuButton>
            <Icons.resolve />
            <span>Resolve post</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => handleArchive()}>
          <SidebarMenuButton>
            <Icons.archive />
            <span>Archive post</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => handleDelete()}>
          <SidebarMenuButton>
            <Icons.circleX />
            <span>Delete</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
