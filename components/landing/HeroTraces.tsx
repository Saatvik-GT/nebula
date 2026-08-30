/** Faint circuit traces linking the peripheral lifecycle nodes. lg+ only. */
export function HeroTraces() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        id="epd-trace-top"
        d="M150 250 C 360 150, 520 250, 720 200 S 1080 150, 1300 250"
        stroke="var(--border)"
        strokeWidth="1.25"
      />
      <path
        d="M120 250 L120 470 C 120 520, 150 560, 210 590 L 360 650"
        stroke="var(--border)"
        strokeWidth="1.25"
        opacity="0.7"
      />
      <path
        d="M1320 250 L1320 470 C 1320 520, 1290 560, 1230 590 L 1080 660"
        stroke="var(--border)"
        strokeWidth="1.25"
        opacity="0.7"
      />
      <path
        d="M150 250 C 360 150, 520 250, 720 200 S 1080 150, 1300 250"
        stroke="var(--accent-bright)"
        strokeWidth="1.25"
        strokeDasharray="4 220"
        opacity="0.5"
        style={{ animation: "epd-trace-dash 6s linear infinite" }}
      />
      {[150, 720, 1300].map((x) => (
        <circle key={x} cx={x} cy={x === 720 ? 200 : 250} r="2.5" fill="var(--accent-bright)" opacity="0.6" />
      ))}
    </svg>
  );
}
