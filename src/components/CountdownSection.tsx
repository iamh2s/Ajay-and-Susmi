
import { useEffect, useState } from "react";
import { Lamp } from "lucide-react";
import data from "@/data/weddingData.json";
import { ScrollReveal, SectionHeading } from "./decor";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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

  const target = new Date(countdown.targetIso).getTime();

  const [remaining, setRemaining] = useState<Remaining>(() =>
    diff(target)
  );

  useEffect(() => {
    // Update the countdown once per second.
    const updateCountdown = () => {
      setRemaining(diff(target));
    };

    updateCountdown();

    const id = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(id);
  }, [target]);

  const units = countdown.units;

  return (
    <section
      aria-label={`${countdown.headingTa} — ${countdown.headingEn}`}
      className="velvet-texture relative mt-15 overflow-hidden py-24 sm:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="kolam-dots pointer-events-none absolute inset-0 opacity-40"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(217,190,124,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* Section heading */}
        <ScrollReveal>
          <SectionHeading
            ta={countdown.headingTa}
            en={countdown.headingEn}
            tone="light"
          />
        </ScrollReveal>

        {/* Countdown cards */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {units.map((unit) => {
              const value =
                remaining[unit.key as keyof Remaining];

              return (
                <div
                  key={unit.key}
                  className="
                    group relative overflow-hidden rounded-2xl
                    border border-gold/45
                    bg-gradient-to-b
                    from-ivory/[0.09] to-ivory/[0.025]
                    px-3 py-7 text-center
                    shadow-[inset_0_1px_0_rgba(217,190,124,0.25),0_24px_50px_-30px_rgba(0,0,0,0.8)]
                  "
                >
                  {/* Gold top line */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-6 top-0 h-px
                      bg-gradient-to-r
                      from-transparent via-gold-light/80 to-transparent
                    "
                  />

                  {/* Decorative diamonds */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-2 top-2 h-2.5 w-2.5
                      rotate-45 border border-gold/50
                    "
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-2 right-2 h-2.5 w-2.5
                      rotate-45 border border-gold/50
                    "
                  />

                  {/* Number: no repeated entrance/exit animation */}
                  <div
                    className="
                      relative inline-block pb-1
                      font-latin text-5xl font-semibold leading-none
                      text-gold-brush
                      sm:text-6xl
                    "
                    style={{
                      textShadow: "0 2px 6px rgba(0,0,0,0.45)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    role="timer"
                    aria-label={`${value} ${unit.en}`}
                  >
                    {pad(value)}
                  </div>

                  {/* Tamil label */}
                  <p className="mt-3.5 font-tamil text-sm font-bold text-ivory/95">
                    {unit.ta}
                  </p>

                  {/* English label */}
                  <p className="mt-1 font-latin text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold-light/75">
                    {unit.en}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Wedding date note */}
        <ScrollReveal
          delay={0.25}
          className="mt-10 flex flex-col items-center gap-1.5 text-center"
        >
          <span
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full border border-gold/45
              bg-maroon-deep/70 text-gold-light
            "
          >
            <Lamp className="h-4 w-4" aria-hidden="true" />
          </span>

          <p className="font-tamil text-sm font-semibold text-ivory/90">
            {countdown.targetNoteTa}
          </p>

          <p className="font-latin text-xs uppercase tracking-[0.28em] text-gold-light/70">
            {countdown.targetNoteEn}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}