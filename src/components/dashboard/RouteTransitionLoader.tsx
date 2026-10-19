"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or search params change, complete navigation
  useEffect(() => {
    setIsNavigating(true);
    setProgress(35);

    const timer1 = setTimeout(() => {
      setProgress(80);
    }, 120);

    const timer2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 250);
    }, 280);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams]);

  // Intercept click on internal links to immediately trigger glowing loading indicator
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/dashboard") &&
        !href.startsWith("#") &&
        target.target !== "_blank" &&
        href !== pathname
      ) {
        setIsNavigating(true);
        setProgress(40);
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Top glowing progress bar */}
      <div
        className="h-1 bg-gradient-to-r from-amber-300 via-brand to-yellow-400 shadow-[0_0_12px_rgba(255,215,88,0.85)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
      
      {/* Subtle glowing pulse orb at progress head */}
      {isNavigating && progress > 0 && progress < 100 && (
        <div
          className="absolute top-0 w-3 h-3 -mt-1 rounded-full bg-brand shadow-[0_0_15px_#FFD758] transition-all duration-300"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      )}
    </div>
  );
}
