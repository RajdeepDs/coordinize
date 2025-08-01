'use client';

import type { Post, Space, User } from '@coordinize/database/db';
import { Input } from '@coordinize/ui/components/input';
import { Icons } from '@coordinize/ui/lib/icons';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostItem } from '@/components/features/activity/post-item';
import { useSearchPosts } from '@/hooks/use-search';

type PostWithRelations = Post & {
  space: Pick<Space, 'id' | 'name' | 'identifier'> | null;
  author: Pick<User, 'id' | 'name' | 'image'> | null;
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const params = useParams<{ slug: string }>();
  const workspaceSlug = params.slug;

  const { data: searchResults, isLoading } = useSearchPosts(
    searchQuery,
    searchQuery.length > 0 && isSearching
  );

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.trim();
      if (query.length > 0) {
        setSearchQuery(query);
        setIsSearching(true);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setInputValue('');
    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const renderSearchResults = () => {
    if (!isSearching) {
      return null;
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-ui-gray-900">Searching...</div>
        </div>
      );
    }

    if (!searchResults || searchResults.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-ui-gray-900">No posts found</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {searchResults.map((post: PostWithRelations) => (
          <PostItem
            authorName={post.author?.name || ''}
            description={post.content || ''}
            id={post.id}
            key={post.id}
            spaceName={post.space?.name || ''}
            title={post.title}
            userImage={post.author?.image || ''}
            workspaceSlug={workspaceSlug}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-md border bg-background">
      <div className="relative">
        <Input
          className="peer border-none ps-9 pe-9 focus-visible:ring-0"
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="Search by describing your post..."
          type="text"
          value={inputValue}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Icons.search size={16} />
        </div>
        {inputValue.length > 0 && (
          <button
            aria-label="Clear search"
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleClearSearch}
            type="button"
          >
            <Icons.x aria-hidden="true" size={16} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <ActivitySection>{renderSearchResults()}</ActivitySection>
      </div>
    </div>
  );
}
