/**
 * Thin vertical signal lines beneath the CTA — a small ensemble of rising
 * traces with a faint green glow. Purely ambient; hidden for reduced motion
 * via the global stylesheet's animation clamp.
 */
const LINES = [
  { left: "12%", delay: "0s", dur: "3.6s", h: 150 },
  { left: "27%", delay: "1.1s", dur: "4.4s", h: 210 },
  { left: "41%", delay: "0.5s", dur: "3.1s", h: 120 },
  { left: "50%", delay: "1.9s", dur: "5s", h: 260 },
  { left: "59%", delay: "0.2s", dur: "3.4s", h: 140 },
  { left: "73%", delay: "1.4s", dur: "4.1s", h: 190 },
  { left: "88%", delay: "0.8s", dur: "3.8s", h: 160 },
];

export function SignalLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] overflow-hidden"
    >
      {LINES.map((l, i) => (
        <span
          key={i}
          className="absolute bottom-0 w-px origin-bottom"
          style={{
            left: l.left,
            height: l.h,
            background:
              "linear-gradient(to top, rgba(74,122,94,0.55), rgba(74,122,94,0.12) 55%, transparent)",
            boxShadow: "0 0 6px rgba(74,122,94,0.35)",
            animation: `epd-signal-rise ${l.dur} cubic-bezier(0.4,0,0.2,1) ${l.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
