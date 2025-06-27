'use client';

import { Button } from '@coordinize/ui/button';
import { cn } from '@coordinize/ui/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@coordinize/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/popover';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';

type TimezoneSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TimezoneSelect({
  value,
  onChange,
}: TimezoneSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [timezones, setTimezones] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && Intl.supportedValuesOf) {
      setTimezones(Intl.supportedValuesOf('timeZone'));
    }
  }, []);

  const formattedTimezones = useMemo(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat('en', {
          timeZone: timezone,
          timeZoneName: 'shortOffset',
        });
        const parts = formatter.formatToParts(new Date());
        const offset =
          parts.find((part) => part.type === 'timeZoneName')?.value || '';
        const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset;

        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
          numericOffset: Number.parseInt(
            offset.replace('GMT', '').replace('+', '') || '0',
            10
          ),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  }, [timezones]);

  // Wait until timezones are loaded before rendering the UI
  if (timezones.length === 0) {
    return null;
  }

  return (
    <div className="*:not-first:mt-2">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-between" id={id} variant="outline">
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value
                ? formattedTimezones.find((tz) => tz.value === value)?.label
                : 'Select timezone'}
            </span>
            <ChevronDownIcon size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] p-0">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {formattedTimezones.map(({ value: itemValue, label }) => (
                  <CommandItem
                    key={itemValue}
                    onSelect={() => {
                      onChange(itemValue);
                      setOpen(false);
                    }}
                    value={itemValue}
                  >
                    {label}
                    {value === itemValue && (
                      <CheckIcon className="ml-auto" size={16} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
