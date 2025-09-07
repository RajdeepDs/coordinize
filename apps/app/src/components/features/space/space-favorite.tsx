"use client";

import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";
import { useSpaceWithPublishedPostsQuery } from "@/hooks/use-space";
import { useToggleFavorite } from "@/hooks/use-toggle-favorite";

type SpaceFavoriteProps = {
  identifier: string;
};

export function SpaceFavorite({ identifier }: SpaceFavoriteProps) {
  const { data: space } = useSpaceWithPublishedPostsQuery(identifier);
  const { mutate: toggleFavorite } = useToggleFavorite();

  const isFavorited = space?.favorite && space.favorite.length > 0;

  function handleToggleFavorite() {
    if (space) {
      toggleFavorite({ id: space.id, type: "space" });
    }
  }

  return (
    <Button
      className={cn(
        "size-7 rounded-sm",
        isFavorited
          ? "text-ui-amber-700 hover:text-ui-amber-600"
          : "text-muted-foreground"
      )}
      onClick={() => handleToggleFavorite()}
      size={"icon"}
      tooltip={isFavorited ? "Remove from favorites" : "Add to your favorites"}
      variant={"ghost"}
    >
      <Icons.star className={isFavorited ? "fill-current" : ""} />
    </Button>
  );
}
