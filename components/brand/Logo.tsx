"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Shared product wordmark. The lockup is a short video clip: a still first
 * frame at rest, the full animation on hover / keyboard focus, reset to the
 * first frame when the pointer leaves.
 */
export function BrandLockup({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  };

  const reset = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label="Executable Project Defense — home"
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
    >
      <video
        ref={videoRef}
        className="block h-11 w-auto select-none sm:h-12"
        src="/logo_video.mp4"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        onLoadedData={reset}
        tabIndex={-1}
      />
    </Link>
  );
}

/** A project entering a verification loop and leaving an evidence trail. */
export function EvidenceTraceMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="27" height="27" rx="8.5" fill="var(--accent)" />
      <path
        d="M9.25 10.25h7.25a6.25 6.25 0 0 1 0 12.5h-4.25"
        fill="none"
        stroke="var(--accent-contrast)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.25" cy="10.25" r="2" fill="var(--accent-contrast)" />
      <circle cx="12.25" cy="22.75" r="2" fill="var(--accent-contrast)" />
      <path d="M12.25 16.5h7.5" stroke="var(--accent-contrast)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function AppBrand({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Defense — dashboard"
    >
      <EvidenceTraceMark className="h-8 w-8 shrink-0" />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-[-0.01em] text-text">
          Defense
        </span>
        <span className="block text-[10.5px] text-muted">
          Executable Project Defense
        </span>
      </span>
    </Link>
  );
}
