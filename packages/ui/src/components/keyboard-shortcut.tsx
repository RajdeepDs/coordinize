'use client';

import { cn } from '@coordinize/ui/lib/utils';
import { useMemo } from 'react';
import { isMacOs, isMobile } from 'react-device-detect';
import type React from 'react';

function getShortcutKeySymbol(key: string) {
  switch (key.toLowerCase()) {
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
    case "esc": 
      return { text: 'Esc'};
    default:
      return { text: key.trim().toUpperCase() };
  }
}

interface KeyboardShortcutProps {
  shortcut: string[] | string;
  className?: string;
  keysClassName?: string;
}

export function KeyboardShortcut({
  shortcut,
  className,
  keysClassName,
}: KeyboardShortcutProps) {
  const keyElements = useMemo(() => {
    // Handle multiple shortcut options (array of shortcuts)
    if (Array.isArray(shortcut)) {
      const allElements: React.ReactNode[] = [];
      
      shortcut.forEach((singleShortcut, shortcutIndex) => {
        // Process each individual shortcut
        const parts = singleShortcut.includes(' then ') 
          ? singleShortcut.split(' then ') 
          : singleShortcut.split('+');

        parts.forEach((key, keyIndex) => {
          const { text, emoji } = getShortcutKeySymbol(key.trim());

          // Add the key in a bordered container
          allElements.push(
            <span
              key={`shortcut-${shortcutIndex}-key-${keyIndex}`}
              className={cn(
                'inline-block text-center rounded ring border-none ring-ui-gray-400 dark:ring-ui-amber-500 p-1 min-w-5 font-normal text-xs text-ui-gray-900 leading-none',
                {
                  'font-[emoji]': emoji,
                  'font-sans': !emoji,
                },
                keysClassName
              )}
            >
              {text}
            </span>
          );

          // Add separator between keys within the same shortcut
          if (keyIndex < parts.length - 1) {
            const separator = singleShortcut.includes(' then ') ? 'then' : '';
            allElements.push(
              <span
                key={`shortcut-${shortcutIndex}-sep-${keyIndex}`}
                className="mx-1 text-xs text-ui-gray-900"
              >
                {separator}
              </span>
            );
          }
        });

        // Add "or" separator between different shortcut options
        if (shortcutIndex < shortcut.length - 1) {
          allElements.push(
            <span
              key={`or-${shortcutIndex}`}
              className="mx-2 text-xs text-ui-gray-900"
            >
              or
            </span>
          );
        }
      });

      return allElements;
    }

    // Handle single shortcut (existing logic)
    let parts: string[];
    if (shortcut !== '+') {
      // Handle different separators
      if (shortcut.includes(' then ')) {
        parts = shortcut.split(' then ');
      } else {
        parts = shortcut.split('+');
      }
    } else {
      parts = ['+'];
    }

    const elements: React.ReactNode[] = [];

    parts.forEach((key, index) => {
      const { text, emoji } = getShortcutKeySymbol(key.trim());

      // Add the key in a bordered container
      elements.push(
        <span
          key={`key-${index}`}
          className={cn(
            'inline-block text-center rounded ring border-none ring-ui-gray-400 dark:ring-ui-amber-500 p-1 min-w-5 font-normal text-xs text-ui-gray-900 leading-none',
            {
              'font-[emoji]': emoji,
              'font-sans': !emoji,
            },
            keysClassName
          )}
        >
          {text}
        </span>
      );

      // Add separator between keys (but not after the last key)
      if (index < parts.length - 1) {
        const separator = shortcut.includes(' then ') ? 'then' : '';
        elements.push(
          <span
            key={`sep-${index}`}
            className="mx-1 text-xs text-ui-gray-900"
          >
            {separator}
          </span>
        );
      }
    });

    return elements;
  }, [shortcut, keysClassName]);

  if (isMobile) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-0',
        className
      )}
    >
      {keyElements}
    </div>
  );
}
