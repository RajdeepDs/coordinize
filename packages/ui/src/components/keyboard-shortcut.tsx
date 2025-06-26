'use client';

import { cn } from '@coordinize/ui/lib/utils';
import { useMemo } from 'react';
import { isMacOs, isMobile } from 'react-device-detect';

function getShortcutKeySymbol(key: string) {
  switch (key) {
    case 'mod':
    case 'meta':
      if (isMacOs) {
        return { text: '⌘', emoji: true };
      }
      return { text: 'Ctrl' };
    case 'alt':
      if (isMacOs) {
        return { text: '⌥', emoji: true };
      }
      return { text: 'Alt' };
    case 'shift':
      return { text: '⇧', emoji: true };
    case 'comma':
      return { text: ',' };
    case 'return':
    case 'enter':
      return { text: 'Enter' };
    case 'backspace':
      return { text: '⌫', emoji: true };
    default:
      return { text: key.trim().toUpperCase() };
  }
}

interface KeyboardShortcutProps {
  shortcut: string[] | string;
  className?: string;
}

export function KeyboardShortcut({
  shortcut,
  className,
}: KeyboardShortcutProps) {
  const components = useMemo(() => {
    let parts: string[];

    if (typeof shortcut === 'string') {
      if (shortcut !== '+') {
        parts = shortcut.split('+');
      } else {
        parts = ['+'];
      }
    } else {
      parts = shortcut;
    }

    return parts.map((key) => {
      const { text, emoji } = getShortcutKeySymbol(key);

      return (
        <span
          className={cn('font-semibold text-xs', {
            'font-[emoji]': emoji,
            'font-mono': !emoji,
          })}
          key={key}
        >
          {text}
        </span>
      );
    });
  }, [shortcut]);

  if (isMobile) return null;

  return (
    <div
      className={cn(
        'flex items-baseline justify-center gap-1 rounded border border-(--ui-gray-600) bg-transparent px-1.5 py-0.5 align-middle text-[10px] text-ui-gray-700 dark:border-(ui-gray-200) dark:border-border',
        className
      )}
    >
      {components}
    </div>
  );
}
