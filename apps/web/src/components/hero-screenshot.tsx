'use client';

import Image from 'next/image';
import LightHero from '../../public/light-hero.webp';

export function HeroScreenshot() {
  return (
    <div className="mt-20 overflow-hidden px-4">
      <Image
        alt="Screenshot of Coordinize home"
        className="mx-auto mt-0 hidden w-[220vw] max-w-7xl overflow-hidden rounded-md border md:relative md:w-full dark:block"
        fetchPriority="high"
        height={575}
        priority={true}
        src={LightHero}
        unoptimized
        width={930}
      />
      <Image
        alt="Screenshot of Coordinize home"
        className="mx-auto mt-0 block w-[220vw] max-w-7xl overflow-hidden rounded-md border md:relative md:w-full dark:hidden"
        fetchPriority="high"
        height={575}
        priority={true}
        src={LightHero}
        unoptimized
        width={930}
      />
    </div>
  );
}
