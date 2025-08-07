import { useGlobalHotkeys } from '@coordinize/ui/hooks';
import { useEffect, useRef, useState } from 'react';

export function useKeyboardNavigation<T>(
  items: T[],
  onSelect: (item: T) => void
) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const navigateUp = () => {
    setSelectedIndex((prev) => {
      if (prev === null) {
        return items.length - 1;
      }
      return prev > 0 ? prev - 1 : items.length - 1;
    });
  };

  const navigateDown = () => {
    setSelectedIndex((prev) => {
      if (prev === null) {
        return 0;
      }
      return prev < items.length - 1 ? prev + 1 : 0;
    });
  };

  const selectCurrent = () => {
    if (selectedIndex === null) {
      setSelectedIndex(0);
      return;
    }
    const selectedItem = items[selectedIndex];
    if (selectedItem) {
      onSelect(selectedItem);
    }
  };

  // Register hotkeys
  useGlobalHotkeys({
    keys: ['k', 'up'],
    callback: navigateUp,
    options: { enabled: items.length > 0 },
  });

  useGlobalHotkeys({
    keys: ['j', 'down'],
    callback: navigateDown,
    options: { enabled: items.length > 0 },
  });

  useGlobalHotkeys({
    keys: 'enter',
    callback: selectCurrent,
    options: { enabled: items.length > 0 },
  });

  // Scroll into view effect
  useEffect(() => {
    if (selectedRef.current && items.length > 0 && selectedIndex !== null) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex, items.length]);

  return { selectedIndex, selectedRef };
}
