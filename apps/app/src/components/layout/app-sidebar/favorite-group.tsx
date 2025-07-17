'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@coordinize/ui/components/collapsible';
import { Label } from '@coordinize/ui/components/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFavoritesQuery } from '@/hooks/use-favorite';

export function FavoritesGroup({ slug }: { slug: string }) {
  const { data: favorites, isLoading } = useFavoritesQuery();
  const [mounted, setMounted] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (favorites && mounted) {
      favorites.forEach((favorite, index) => {
        setTimeout(() => {
          setAnimatedItems((prev) => new Set(prev).add(favorite.id));
        }, index * 100);
      });
    }
  }, [favorites, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Collapsible className="group/collapsible" defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Favorites
            <Icons.ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Label className="font-normal text-muted-foreground">
                      Loading favorites...
                    </Label>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {!isLoading &&
                favorites &&
                favorites.length > 0 &&
                favorites.map((favorite) => {
                  const isAnimated = animatedItems.has(favorite.id);

                  if (
                    favorite.postId &&
                    favorite.post?.title &&
                    typeof favorite.postId === 'string'
                  ) {
                    const postHref = `/${slug}/posts/${favorite.postId}`;
                    return (
                      <SidebarMenuItem
                        className={`transition-all duration-300 ease-out ${
                          isAnimated
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                        }`}
                        key={favorite.id}
                      >
                        <SidebarMenuButton asChild>
                          <Link href={postHref}>
                            <Icons.post />
                            <span>{favorite.post.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  if (
                    favorite.space?.identifier &&
                    favorite.space?.name &&
                    typeof favorite.space.identifier === 'string'
                  ) {
                    const spaceHref = `/${slug}/spaces/${favorite.space.identifier}`;
                    return (
                      <SidebarMenuItem
                        className={`transition-all duration-300 ease-out ${
                          isAnimated
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-4 opacity-0'
                        }`}
                        key={favorite.id}
                      >
                        <SidebarMenuButton asChild>
                          <Link href={spaceHref}>
                            {favorite.space.icon ? (
                              <span className="text-xs">
                                {favorite.space.icon}
                              </span>
                            ) : (
                              <Icons.space />
                            )}
                            <span>{favorite.space.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  return null;
                })}

              {!isLoading && (!favorites || favorites.length === 0) && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Label className="font-normal text-muted-foreground">
                      Favorite your most important posts.
                    </Label>
                    <Icons.star className="text-muted-foreground" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
