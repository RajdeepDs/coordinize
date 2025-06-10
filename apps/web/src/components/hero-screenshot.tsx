"use client";

import Image from "next/image";

import { useTheme } from "next-themes";
import HeroDarkImage from "../../public/hero-dark.png";
import HeroLightImage from "../../public/hero-light.png";

export function HeroScreenshot() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const images = {
    light: HeroLightImage,
    dark: HeroDarkImage,
  };

  if (!resolvedTheme) {
    return null;
  }

  return (
    <div className="mt-20 overflow-hidden border-b px-4">
      <Image
        alt="Screenshot of Coordinize home"
        src={isDark ? images.dark : images.light}
        className="-mb-[60px] lg:-mb-[100px] mx-auto mt-0 w-[220vw] max-w-7xl overflow-hidden rounded-md border drop-shadow-2xl md:relative md:w-full"
        width={3424}
        height={2024}
        priority
        quality={100}
      />
    </div>
  );
}
