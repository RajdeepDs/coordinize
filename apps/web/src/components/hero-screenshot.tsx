"use client";

import Image from "next/image";

import HeroDarkImage from "../../public/hero-dark.png";
import HeroLightImage from "../../public/hero-light.png";

export function HeroScreenshot() {
  return (
    <div className="mt-20 overflow-hidden border-b px-4">
      <Image
        src={HeroDarkImage}
        alt="Screenshot of Coordinize home"
        className="-mb-[60px] lg:-mb-[100px] mx-auto mt-0 hidden w-[220vw] max-w-7xl overflow-hidden rounded-lg border drop-shadow-2xl md:relative md:w-full dark:block"
        width={3424}
        height={2024}
        priority
        quality={100}
      />
      <Image
        src={HeroLightImage}
        alt="Screenshot of Coordinize home"
        className="-mb-[60px] lg:-mb-[100px] mx-auto mt-0 block w-[220vw] max-w-7xl overflow-hidden rounded-lg border drop-shadow-2xl md:relative md:w-full dark:hidden"
        width={3424}
        height={2024}
        priority
        quality={100}
      />
    </div>
  );
}
