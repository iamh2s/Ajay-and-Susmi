import { AnimatePresence, motion } from "framer-motion";
import { Lamp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import data from "@/data/weddingData.json";
import { ScrollReveal, SectionHeading } from "./decor";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Remaining {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownSection() {
  const { countdown } = data;
  const target = useMemo(() => new Date(countdown.targetIso).getTime(), [countdown.targetIso]);
  const [remaining, setRemaining] = useState<Remaining>(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section
      aria-label={`${countdown.headingTa} — ${countdown.headingEn}`}
      className="velvet-texture relative overflow-hidden py-24 sm:py-28 mt-15"
    >
      <div aria-hidden="true" className="kolam-dots absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(217,190,124,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={countdown.headingTa} en={countdown.headingEn} tone="light" />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {countdown.units.map((unit, i) => {
              const value = remaining[unit.key as keyof Remaining];
              return (
                <div
                  key={unit.key}
                  className="group relative overflow-hidden rounded-2xl border border-gold/45 bg-gradient-to-b from-ivory/[0.09] to-ivory/[0.025] px-3 py-7 text-center shadow-[inset_0_1px_0_rgba(217,190,124,0.25),0_24px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  aria-live={unit.key === "seconds" ? "off" : "polite"}
                >
                  <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/80 to-transparent" />
                  <span aria-hidden="true" className="absolute left-2 top-2 h-2.5 w-2.5 rotate-45 border border-gold/50" />
                  <span aria-hidden="true" className="absolute bottom-2 right-2 h-2.5 w-2.5 rotate-45 border border-gold/50" />

                  <div className="relative font-latin text-5xl font-semibold leading-none sm:text-6xl">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.45, delay: i * 0.02, ease: "easeOut" }}
                        className="text-gold-brush inline-block pb-1"
                        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))" }}
                      >
                        {pad(value)}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <p className="mt-3.5 font-tamil text-sm font-bold text-ivory/95">{unit.ta}</p>
                  <p className="mt-1 font-latin text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold-light/75">
                    {unit.en}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-10 flex flex-col items-center gap-1.5 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 bg-maroon-deep/70 text-gold-light">
            <Lamp className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="font-tamil text-sm font-semibold text-ivory/90">{countdown.targetNoteTa}</p>
          <p className="font-latin text-xs uppercase tracking-[0.28em] text-gold-light/70">{countdown.targetNoteEn}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
