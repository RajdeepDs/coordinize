import type { Post, Space } from "@coordinize/database/db";
import { Button } from "@coordinize/ui/components/button";
import { Separator } from "@coordinize/ui/components/separator";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { usePostByIdQuery } from "@/hooks/use-posts";
import { useToggleFavorite } from "@/hooks/use-toggle-favorite";
import { ActivitySection } from "../activity/activity-section";
import { EditablePostContent } from "./editable-post-content";
import { PostActivitySection } from "./post-activity-section";
import { PostMetadata } from "./post-metadata";
import { PostOptions } from "./post-options";
import { ResolvedPostLabel } from "./resolved-post-label";

type PostPageContentProps = {
  postId: string;
};

/**
 * This component displays the content of a post. Used in the Inbox.
 */
export function PostView({ postId }: PostPageContentProps) {
  const { slug } = useParams<{ slug: string }>();
  const { data: post } = usePostByIdQuery(postId);

  if (!post) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-ui-gray-900">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <PostViewTitlebar post={post} slug={slug} />
      <InnerPostViewContent post={post} />
    </div>
  );
}

type PostViewTitlebarProps = {
  slug: string;
  post: Post & {
    favorite?: Array<{ id: string }>;
    space: Partial<Space>;
  };
};

function PostViewTitlebar({ post, slug }: PostViewTitlebarProps) {
  const { mutate: toggleFavorite } = useToggleFavorite();
  const isFavorited = post?.favorite && post.favorite.length > 0;

  function handleToggleFavorite() {
    if (post) {
      toggleFavorite({ id: post.id, type: "post" });
    }
  }
  return (
    <PageHeader
      breadcrumb={[
        {
          icon: post.space?.icon ? (
            <span className="text-sm">{post.space.icon}</span>
          ) : (
            <Icons.space size={16} />
          ),
          label: post.space?.name || "Space",
          href: `/${slug}/spaces/${post.space.identifier}`,
        },
        {
          label: post.title,
        },
      ]}
      leftContent={
        <Button
          className={cn(
            "size-7 rounded-sm",
            isFavorited
              ? "text-ui-amber-700 hover:text-ui-amber-600"
              : "text-muted-foreground"
          )}
          onClick={() => handleToggleFavorite()}
          size={"icon"}
          tooltip={
            isFavorited ? "Remove from favorites" : "Add to your favorites"
          }
          variant={"ghost"}
        >
          <Icons.star className={isFavorited ? "fill-current" : ""} />
        </Button>
      }
      rightContent={<PostOptions postId={post.id} />}
      showRightSidebarTrigger
    />
  );
}

function InnerPostViewContent({
  post,
}: {
  post: Post & {
    author: { name: string; image?: string | null };
    resolvedBy?: { name: string } | null;
    resolvedAt?: Date | null;
  };
}) {
  return (
    <div className="flex-1 overflow-auto">
      <ActivitySection>
        {post.resolvedAt && post.resolvedById && (
          <ResolvedPostLabel
            resolvedAt={post.resolvedAt}
            userName={post.resolvedBy?.name || ""}
          />
        )}
        <PostMetadata
          createdAt={post.createdAt}
          userImage={post.author.image ?? ""}
          userName={post.author.name ?? ""}
        />
        <EditablePostContent
          initialContent={post.content}
          initialTitle={post.title}
          postId={post.id}
        />
        <Button
          className={cn("size-7 rounded-sm text-muted-foreground")}
          size={"icon"}
          tooltip="Add a reaction"
          variant={"ghost"}
        >
          <Icons.emojiPlus size={16} />
        </Button>
        <Separator />
        <PostActivitySection postId={post.id} />
      </ActivitySection>
    </div>
  );
}
