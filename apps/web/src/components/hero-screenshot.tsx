'use client';

import Image from 'next/image';

import HeroDarkImage from '../../public/hero-dark.png';
import HeroLightImage from '../../public/hero-light.png';

export function HeroScreenshot() {
  return (
    <div className="mt-20 overflow-hidden border-b px-4">
      <Image
        alt="Screenshot of Coordinize home"
        className="-mb-[60px] lg:-mb-[100px] mx-auto mt-0 hidden w-[220vw] max-w-7xl overflow-hidden rounded-lg border drop-shadow-2xl md:relative md:w-full dark:block"
        height={2024}
        priority
        quality={100}
        src={HeroDarkImage}
        width={3424}
      />
      <Image
        alt="Screenshot of Coordinize home"
        className="-mb-[60px] lg:-mb-[100px] mx-auto mt-0 block w-[220vw] max-w-7xl overflow-hidden rounded-lg border drop-shadow-2xl md:relative md:w-full dark:hidden"
        height={2024}
        priority
        quality={100}
        src={HeroLightImage}
        width={3424}
      />
    </div>
  );
}
