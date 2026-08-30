/**
 * The single soft ambient radial glow permitted in this build — landing hero
 * only, nowhere else. One warm-green light field plus a faint diagonal beam.
 */
export function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-6%] h-[82vh] w-[94vw] max-w-[1360px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(46% 46% at 50% 40%, rgba(214,232,220,0.42) 0%, rgba(150,192,166,0.24) 20%, rgba(96,150,120,0.12) 40%, rgba(10,11,10,0) 72%)",
          animation: "epd-glow-drift 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/2 top-[10%] h-[34vh] w-[46vw] max-w-[640px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(232,242,236,0.30) 0%, rgba(150,192,166,0.10) 45%, rgba(10,11,10,0) 78%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute right-[2%] top-[-24%] h-[110vh] w-[46vw] rotate-[19deg]"
        style={{
          background:
            "linear-gradient(180deg, rgba(214,230,220,0.20) 0%, rgba(120,170,140,0.09) 34%, rgba(74,122,94,0.03) 58%, rgba(10,11,10,0) 80%)",
          filter: "blur(36px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,11,10,0) 0%, rgba(20,25,22,0.55) 70%, rgba(10,11,10,0.9) 100%)",
        }}
      />
    </div>
  );
}
