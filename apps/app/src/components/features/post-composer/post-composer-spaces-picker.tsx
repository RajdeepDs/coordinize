'use client';

import type { Space } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@coordinize/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/components/popover';
import { Tooltip } from '@coordinize/ui/components/tooltip';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { PostSchema } from '@/lib/schemas/post';

interface PostComposerSpacesPickerProps {
  spaces: readonly Space[];
  workspaceSlug: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function PostComposerSpacesPicker({
  spaces,
  workspaceSlug,
  open,
  setOpen,
}: PostComposerSpacesPickerProps) {
  const methods = useFormContext<PostSchema>();
  const spaceId = methods.watch('space_id');

  const selectedSpaceId = spaceId || spaces[0]?.id;
  const selectedSpace = spaces.find((space) => space.id === selectedSpaceId);

  useEffect(() => {
    if (!spaceId && spaces[0]?.id) {
      methods.setValue('space_id', spaces[0].id);
    }
  }, [spaceId, spaces, methods]);

  if (!spaces || spaces.length === 0) {
    return null;
  }

  if (spaces.length === 1) {
    return (
      <div className="flex items-start gap-2 text-sm">
        <p>{spaces[0]?.name}</p>
        <span className="flex items-center gap-1 text-muted-foreground">
          {spaces[0]?.identifier}
        </span>
      </div>
    );
  }

  return (
    <>
      <Popover onOpenChange={setOpen} open={open}>
        <Tooltip
          align="start"
          label="Set space"
          shortcut="meta+shift+m"
          side="bottom"
        >
          <PopoverTrigger asChild className="cursor-pointer outline-none">
            <div className="flex w-fit items-start gap-2 text-sm">
              <div className="flex items-center gap-2">
                {selectedSpace?.icon ? (
                  <span className="text-xs">{selectedSpace.icon}</span>
                ) : (
                  <Icons.space size={16} />
                )}
                <p>{selectedSpace?.name ?? 'Select space'}</p>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                {selectedSpace?.identifier || '--'}
                <Icons.chevronDown size={16} />
              </span>
            </div>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent align="start" className="w-full p-0 shadow-md/5">
          <Command>
            <CommandInput
              className="h-7"
              containerClasses="m-1 px-2 bg-input rounded-sm border"
              placeholder="Search space..."
              showIcon={false}
            />
            <CommandList>
              <CommandEmpty className="py-2 text-center text-sm">
                No space found.
              </CommandEmpty>
              <CommandGroup className="p-1">
                {spaces.map((space) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={space.identifier}
                    onSelect={() => {
                      methods.setValue('space_id', space.id);
                      setOpen(false);
                    }}
                    value={space.identifier}
                  >
                    {space.icon ? (
                      <span className="text-xs">{space.icon}</span>
                    ) : (
                      <Icons.space
                        className="text-muted-foreground"
                        size={16}
                      />
                    )}
                    {space.name}
                    {selectedSpaceId === space.id && (
                      <Icons.check
                        className="ml-auto text-muted-foreground"
                        size={16}
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup className="p-1">
                <Button
                  asChild
                  className="w-full justify-start gap-3 px-2 font-normal text-accent-foreground hover:bg-ui-gray-100"
                  size={'sm'}
                  tooltip="Create a new space"
                  tooltipSide="right"
                  variant="ghost"
                >
                  <Link href={`/${workspaceSlug}/settings/new-space`}>
                    <Icons.plus
                      aria-hidden="true"
                      className="text-muted-foreground"
                      size={16}
                    />
                    New space
                  </Link>
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
