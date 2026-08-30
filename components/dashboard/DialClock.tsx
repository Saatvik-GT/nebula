"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Analog clock rendered as bare dials — 60 tick marks and three hands, no
 * bounding circle. Reads the viewer's local time and ticks once a second.
 * Colour comes from `currentColor`, so the containing tile drives it.
 */
export function DialClock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now ? now.getSeconds() : 0;
  const minutes = now ? now.getMinutes() : 0;
  const hours = now ? now.getHours() % 12 : 0;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn(className)}
      role="img"
      aria-label={now ? `Current time ${now.toLocaleTimeString()}` : "Clock"}
    >
      {Array.from({ length: 60 }).map((_, i) => {
        const major = i % 5 === 0;
        const a = (i * 6 * Math.PI) / 180;
        const inner = major ? 76 : 84;
        return (
          <line
            key={i}
            x1={100 + inner * Math.sin(a)}
            y1={100 - inner * Math.cos(a)}
            x2={100 + 92 * Math.sin(a)}
            y2={100 - 92 * Math.cos(a)}
            stroke="currentColor"
            strokeWidth={major ? 2 : 1}
            strokeLinecap="round"
            opacity={major ? 0.7 : 0.22}
          />
        );
      })}

      <line
        x1="100"
        y1="108"
        x2="100"
        y2="52"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 100 100)`}
      />
      <line
        x1="100"
        y1="112"
        x2="100"
        y2="30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${minDeg} 100 100)`}
      />
      <line
        x1="100"
        y1="118"
        x2="100"
        y2="26"
        stroke="var(--accent-bright)"
        strokeWidth="1.25"
        strokeLinecap="round"
        transform={`rotate(${secDeg} 100 100)`}
      />
      <circle cx="100" cy="100" r="2.75" fill="currentColor" />
    </svg>
  );
}
