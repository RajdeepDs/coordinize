'use client';

import { Button } from '@coordinize/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Button
      className="cursor-pointer"
      onClick={toggleTheme}
      size="sm"
      variant="ghost"
    >
      <Sun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-foreground transition-all dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-foreground transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
