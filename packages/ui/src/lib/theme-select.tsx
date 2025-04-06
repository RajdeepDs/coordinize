"use client";

import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Icons } from "./icons";

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[120px]" size="sm">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <Icons.sun />
          Light
        </SelectItem>
        <SelectItem value="dark">
          <Icons.moon />
          Dark
        </SelectItem>
        <SelectItem value="system">
          <Icons.monitor />
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
