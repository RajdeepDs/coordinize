"use client";

import {
  RadioGroup,
  RadioGroupItem,
} from "@coordinize/ui/components/radio-group";
import { CheckIcon, MinusIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const items = [
  { value: "light", label: "Light", image: "/ui-light.webp" },
  { value: "dark", label: "Dark", image: "/ui-dark.webp" },
  { value: "system", label: "System", image: "/ui-system.webp" },
];

export default function InterfaceSelect() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <fieldset className="space-y-4">
      <RadioGroup className="flex gap-3" defaultValue={theme}>
        {items.map((item) => (
          <label
            htmlFor={`interface-select-${item.value}`}
            key={`interface-select-${item.value}`}
          >
            <RadioGroupItem
              className="peer sr-only after:absolute after:inset-0"
              id={`interface-select-${item.value}`}
              onClick={() => setTheme(item.value)}
              value={item.value}
            />
            <Image
              alt={item.label}
              className="relative cursor-pointer overflow-hidden rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-disabled:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-disabled:opacity-50"
              height={70}
              src={item.image}
              width={88}
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <CheckIcon
                aria-hidden="true"
                className="group-peer-data-[state=unchecked]:hidden"
                size={16}
              />
              <MinusIcon
                aria-hidden="true"
                className="group-peer-data-[state=checked]:hidden"
                size={16}
              />
              <span className="font-medium text-xs">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
