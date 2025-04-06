"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function RollingCaptions({ captions }: { captions: string[] }) {
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaptionIndex((prevIndex) => (prevIndex + 1) % captions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [captions.length]);

  return (
    <aside className="hidden items-center justify-center border-l bg-muted p-8 lg:flex">
      <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden text-center">
        <AnimatePresence>
          <motion.h2
            key={currentCaptionIndex}
            initial={{ opacity: 0, y: 50, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: -1, y: -50, filter: "blur(2px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute font-semibold text-2xl text-accent-foreground"
          >
            {captions[currentCaptionIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </aside>
  );
}
