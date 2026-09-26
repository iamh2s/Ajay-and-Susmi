import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  SVG gradient defs (brass / flame)                                   */
/* ------------------------------------------------------------------ */

export function SvgDefs() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8cf96" />
          <stop offset="0.45" stopColor="#b08d3c" />
          <stop offset="1" stopColor="#77571f" />
        </linearGradient>
        <radialGradient id="flameGrad" cx="0.5" cy="0.72" r="0.65">
          <stop offset="0" stopColor="#fff3c9" />
          <stop offset="0.55" stopColor="#f0b93e" />
          <stop offset="1" stopColor="#c9622a" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gopuram — stylized temple tower line-art                            */
/* ------------------------------------------------------------------ */

export function Gopuram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Temple gopuram ornament"
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {/* top kalasams */}
        <path d="M200 22c3.5 6 3.5 10 0 14-3.5-4-3.5-8 0-14Z" />
        <path d="M168 40c2.6 4.6 2.6 8 0 11.4-2.6-3.4-2.6-6.8 0-11.4Z" />
        <path d="M232 40c2.6 4.6 2.6 8 0 11.4-2.6-3.4-2.6-6.8 0-11.4Z" />
        <path d="M140 60c2 3.8 2 6.6 0 9.6-2-3-2-5.8 0-9.6Z" />
        <path d="M260 60c2 3.8 2 6.6 0 9.6-2-3-2-5.8 0-9.6Z" />
        {/* tiers (top to bottom) */}
        <path d="M176 52h48l6 24h-60l6-24Z" />
        <path d="M158 80h84l8 28H150l8-28Z" />
        <path d="M140 112h120l10 32H130l10-32Z" />
        <path d="M118 148h164l14 40H104l14-40Z" />
        <path d="M92 192h216l18 36H74l18-36Z" />
        {/* tier niches */}
        <path d="M196 58h8M196 66h8" strokeWidth="1.2" />
        <path d="M182 88h10M208 88h10M182 98h10M208 98h10" strokeWidth="1.2" />
        <path d="M164 120h11M218 120h11M164 132h11M218 132h11M191 120h18" strokeWidth="1.2" />
        <path d="M140 158h12M182 158h12M224 158h12M140 174h12M182 174h12M224 174h12" strokeWidth="1.2" />
        <path d="M110 202h12M156 202h12M202 202h12M248 202h12M110 214h12M156 214h12M202 214h12M248 214h12" strokeWidth="1.2" />
        {/* base columns */}
        <path d="M74 228h252" strokeWidth="2" />
        <path d="M64 236h272" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Kuthu Vilakku — traditional brass lamp                              */
/* ------------------------------------------------------------------ */

export function Vilakku({ className, flame = true }: { className?: string; flame?: boolean }) {
  return (
    <svg viewBox="0 0 60 118" className={className} role="img" aria-label="Kuthu vilakku brass lamp">
      {/* flame */}
      {flame && (
        <g className="flame">
          <path d="M30 6c5.2 7.6 6.4 13 0 20-6.4-7-5.2-12.4 0-20Z" fill="url(#flameGrad)" />
          <circle cx="30" cy="21" r="6.5" fill="#f5c94a" opacity="0.28" />
        </g>
      )}
      {!flame && <path d="M30 10c4 6 5 10 0 15-5-5-4-9 0-15Z" fill="url(#flameGrad)" opacity="0.85" />}
      {/* lamp */}
      <g fill="url(#brass)" stroke="#77571f" strokeWidth="0.6">
        <path d="M24 27h12l-1.4 6H25.4L24 27Z" />
        <path d="M27.6 33h4.8l1 10h-6.8l1-10Z" />
        <path d="M20 43h20c0 3.4-4.4 5.2-10 5.2s-10-1.8-10-5.2Z" />
        <path d="M28 48.6h4l1.2 18h-6.4l1.2-18Z" />
        <path d="M22 66.6h16l1.8 5H20.2l1.8-5Z" />
        <path d="M27 71.6h6l1.4 16h-8.8l1.4-16Z" />
        <path d="M16 87.6h28c0 4.6-6.2 7.4-14 7.4s-14-2.8-14-7.4Z" />
        <path d="M12 96h36c1.8 4.4 3.4 7 5.5 9.4-3.4 3.4-13 5.4-23.5 5.4s-20.1-2-23.5-5.4C8.6 103 10.2 100.4 12 96Z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner flourish                                                     */
/* ------------------------------------------------------------------ */

function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M4 48C4 22 22 4 48 4" />
        <path d="M12 48C12 28 28 12 48 12" opacity="0.55" />
        <path d="M4 48V34M48 4H34" opacity="0.8" />
      </g>
      <path d="M11 25c4.2 1 7.4 4.2 8.2 8.6-4.4-1-7.4-4.4-8.2-8.6Z" fill="currentColor" opacity="0.85" />
      <circle cx="7.5" cy="7.5" r="2.4" fill="currentColor" />
      <circle cx="17" cy="12.5" r="1.5" fill="currentColor" opacity="0.75" />
      <circle cx="12.5" cy="17" r="1.5" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

export function CornerOrnaments({
  className,
  size = "h-10 w-10 sm:h-12 sm:w-12",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <Corner className={cn("absolute left-0 top-0 rotate-0", size)} />
      <Corner className={cn("absolute right-0 top-0 rotate-90", size)} />
      <Corner className={cn("absolute bottom-0 right-0 rotate-180", size)} />
      <Corner className={cn("absolute bottom-0 left-0 -rotate-90", size)} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold divider with central motif                                     */
/* ------------------------------------------------------------------ */

function DividerMotif({ kind }: { kind: "diamond" | "lotus" | "kalasam" }) {
  if (kind === "kalasam") {
    return (
      <svg viewBox="0 0 24 30" className="h-6 w-5" aria-hidden="true" fill="currentColor">
        <path d="M12 0c1.6 2.4 1.6 4.2 0 6.4C10.4 4.2 10.4 2.4 12 0Z" />
        <path d="M7 8.5h10l1.4 2.4c2.2 1.6 3.6 4 3.6 6.6 0 5.2-4.4 8-10 8s-10-2.8-10-8c0-2.6 1.4-5 3.6-6.6L7 8.5Z" />
      </svg>
    );
  }
  if (kind === "lotus") {
    return (
      <svg viewBox="0 0 40 26" className="h-5 w-8" aria-hidden="true" fill="currentColor">
        <path d="M20 1c3 4.6 3 9.4 0 14-3-4.6-3-9.4 0-14Z" />
        <path d="M10.5 4.5c4.2 1.6 7 5 8 9.8-4.6-1.4-7.4-4.8-8-9.8Z" opacity="0.8" />
        <path d="M29.5 4.5c-4.2 1.6-7 5-8 9.8 4.6-1.4 7.4-4.8 8-9.8Z" opacity="0.8" />
        <path d="M2.5 10c4.6.4 8.4 3 10.6 7.4C8 17.6 4.4 14.6 2.5 10Z" opacity="0.6" />
        <path d="M37.5 10c-4.6.4-8.4 3-10.6 7.4 5.1.2 8.7-2.8 10.6-7.4Z" opacity="0.6" />
        <rect x="6" y="21.5" width="28" height="1.6" rx="0.8" opacity="0.7" />
      </svg>
    );
  }
  return (
    <span className="flex items-center gap-2" aria-hidden="true">
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-70" />
      <span className="h-2.5 w-2.5 rotate-45 border border-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-70" />
    </span>
  );
}

export function GoldDivider({
  className,
  motif = "diamond",
  widthClass = "w-56 sm:w-72",
}: {
  className?: string;
  motif?: "diamond" | "lotus" | "kalasam";
  widthClass?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-3", widthClass, className)}>
      <span className="hairline-gold flex-1" />
      <DividerMotif kind={motif} />
      <span className="hairline-gold flex-1" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  ta,
  en,
  tone = "dark",
  className,
}: {
  ta: string;
  en: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <h2
        className={cn(
          "font-tamil text-4xl font-bold leading-snug sm:text-5xl lg:text-6xl",
          isLight ? "text-gold-brush pb-1" : "text-maroon"
        )}
      >
        {ta}
      </h2>
      <GoldDivider
        className={cn("mt-4", isLight ? "text-gold" : "text-gold-deep")}
        motif="lotus"
      />
      <p
        className={cn(
          "mt-4 font-latin text-xs font-medium uppercase tracking-[0.42em] sm:text-sm",
          isLight ? "text-gold-light/85" : "text-gold-deep"
        )}
      >
        {en}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal wrapper                                               */
/* ------------------------------------------------------------------ */

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 30,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Falling petals                                                      */
/* ------------------------------------------------------------------ */

export function Petals({ count = 12, className }: { count?: number; className?: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 83 + 7) % 100}%`,
        dur: 13 + ((i * 3.7) % 9),
        delay: -((i * 4.9) % 17),
        size: 8 + ((i * 1.7) % 7),
        dx: `${(i % 2 === 0 ? 1 : -1) * (22 + ((i * 13) % 46))}px`,
        rot: 160 + ((i * 53) % 260),
        o: 0.35 + (((i * 29) % 35) + 10) / 100,
        marigold: i % 5 === 3,
      })),
    [count]
  );
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((p, i) => (
        <span
          key={i}
          className={cn("petal", p.marigold && "petal--marigold")}
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.28,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--dx": p.dx,
              "--rot": `${p.rot}deg`,
              "--po": p.o,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mango-leaf toran                                                    */
/* ------------------------------------------------------------------ */

export function MangoToran({ className }: { className?: string }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 13 }, (_, i) => {
        const x = 24 + i * 22;
        const sag = Math.sin((i / 12) * Math.PI) * 14;
        const y = 8 + sag;
        const rot = (i - 6) * -6;
        const len = 16 + (i % 3) * 4;
        return { x, y, rot, len };
      }),
    []
  );
  return (
    <svg viewBox="0 0 312 44" className={className} aria-hidden="true" fill="none">
      <path d="M8 8 Q156 34 304 8" stroke="#b08d3c" strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <path
            d={`M0 0 Q5.5 ${l.len * 0.45} 0 ${l.len} Q-5.5 ${l.len * 0.45} 0 0`}
            fill="#173a2b"
            stroke="#b08d3c"
            strokeWidth="0.5"
            opacity="0.92"
          />
        </g>
      ))}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 46 + i * 37;
        const y = 8 + Math.sin(((i * 3 + 1.5) / 12) * Math.PI) * 13;
        return <circle key={`m-${i}`} cx={x} cy={y + 3} r="3" fill="#c77b2e" stroke="#8a5a1c" strokeWidth="0.5" />;
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Temple-pillar texture strip (decorative band)                       */
/* ------------------------------------------------------------------ */

export function PillarStrip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 34" className={className} aria-hidden="true" fill="none" preserveAspectRatio="none">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M0 4h360M0 30h360" opacity="0.9" />
        <path d="M0 9h360M0 25h360" opacity="0.45" />
      </g>
      <g stroke="currentColor" strokeWidth="0.9" opacity="0.8">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${10 + i * 20} 13l5 4-5 4-5-4 5-4Z`} />
        ))}
      </g>
    </svg>
  );
}
