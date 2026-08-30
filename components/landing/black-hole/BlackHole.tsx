"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./renderer";

type Status = "loading" | "ready" | "unsupported";

/**
 * Optimized multi-pass black-hole renderer, ported from vgpu.sh
 * (https://vgpu.sh/examples/optimized-black-hole). Bakes relativistic ray
 * traversal once into a G-buffer, then reuses it for animated disk shading,
 * stars, antialiasing and HDR bloom. Requires WebGPU; degrades to a static
 * backdrop where it is unavailable.
 */
export function BlackHole({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof navigator === "undefined" || !("gpu" in navigator)) {
      setStatus("unsupported");
      return;
    }

    let cancelled = false;
    const renderer = createRenderer({ canvas });
    void renderer.ready
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unsupported");
      });

    return () => {
      cancelled = true;
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className={`block h-full w-full touch-none transition-opacity duration-700 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
      {status !== "ready" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 62% 42%, rgba(120,150,255,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(closest-side at 62% 42%, rgba(0,0,0,0) 38%, rgba(255,180,120,0.14) 42%, rgba(0,0,0,0) 55%)",
          }}
        />
      )}
      {status === "unsupported" && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10.5px] text-white/35">
          WebGPU unavailable — showing static backdrop
        </p>
      )}
    </div>
  );
}
