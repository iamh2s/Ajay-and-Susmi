import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, ExternalLink, MapPin, Navigation } from "lucide-react";
import data from "@/data/weddingData.json";
import { GoldDivider, ScrollReveal, SectionHeading } from "./decor";

function MapArt() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/45 bg-maroon-deep/70 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
      <div aria-hidden="true" className="map-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_45%,transparent,rgba(30,6,11,0.55))]"
      />
      {/* abstract streets */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <g stroke="rgba(245,235,221,0.14)" strokeWidth="5" strokeLinecap="round">
          <path d="M-10 120 C90 108 150 140 250 118 C320 103 360 116 410 100" />
          <path d="M-10 250 C80 262 170 232 260 252 C330 268 370 250 410 262" />
          <path d="M120 -10 C132 80 108 160 124 250 C136 320 120 360 128 410" />
          <path d="M285 -10 C272 90 300 170 282 260 C270 330 288 380 280 410" />
        </g>
        <motion.path
          d="M52 330 C120 300 118 238 168 222 C232 202 240 168 262 138"
          stroke="#3f7a5c"
          strokeWidth="3.5"
          strokeDasharray="10 12"
          strokeLinecap="round"
          initial={reduce ? {} : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        <circle cx="52" cy="330" r="7" fill="#d9be7c" stroke="#77571f" strokeWidth="1.5" />
        <circle cx="52" cy="330" r="3" fill="#4a0e17" />
      </svg>

      {/* destination marker */}
      <div className="absolute left-[65.5%] top-[34.5%] -translate-x-1/2 -translate-y-1/2">
        {!reduce && (
          <>
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-light/50"
              animate={{ scale: [0.4, 1.15], opacity: [0.8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-light/40"
              animate={{ scale: [0.4, 1.15], opacity: [0.8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
            />
          </>
        )}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold-light bg-gradient-to-b from-gold-light to-gold shadow-[0_0_36px_rgba(217,190,124,0.5)]">
          <MapPin className="h-6 w-6 fill-maroon text-maroon" aria-hidden="true" />
        </span>
      </div>

      <span aria-hidden="true" className="absolute right-4 top-4 text-gold-light/70">
        <Navigation className="h-5 w-5 rotate-45" />
      </span>
    </div>
  );
}

export default function VenueSection() {
  const { venue, invitation } = data;
  return (
    <section
      id="venue"
      aria-label={`${venue.headingTa} — ${venue.headingEn}`}
      className="velvet-texture relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden="true" className="kolam-dots absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={venue.headingTa} en={venue.headingEn} tone="light" />
        </ScrollReveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal delay={0.1}>
            <div className="rounded-[2rem] bg-gradient-to-b from-gold-light via-gold to-gold-deep p-[2.5px] shadow-[0_44px_100px_-44px_rgba(0,0,0,0.85)]">
              <div className="paper-texture rounded-[calc(2rem-2.5px)] border border-gold-deep/30 px-7 py-10 sm:px-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/55 bg-ivory-deep text-gold-deep shadow-[inset_0_2px_6px_rgba(176,141,60,0.25)]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-tamil text-2xl font-bold leading-snug text-maroon sm:text-3xl">
                  {venue.venueTa}
                </h3>
                <p className="mt-1 font-latin text-lg italic text-gold-deep sm:text-xl">{venue.venueEn}</p>

                <div className="mt-4">
                  <GoldDivider motif="diamond" className="text-gold-deep/80" widthClass="w-36" />
                </div>

                <address className="mt-5 not-italic">
                  {venue.addressTa.map((line) => (
                    <p key={line} className="font-tamil text-base leading-relaxed text-ink/85">
                      {line}
                    </p>
                  ))}
                  <div className="mt-1.5">
                    {venue.addressEn.map((line) => (
                      <p key={line} className="font-latin text-sm italic text-ink/60">
                        {line}
                      </p>
                    ))}
                  </div>
                </address>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-gold/30 pt-6">
                  <span className="flex items-center gap-2.5">
                    <CalendarDays className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    <span className="font-tamil text-sm font-semibold text-maroon">{invitation.dateTa}</span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    <span className="font-tamil text-sm font-semibold text-maroon">{invitation.timeTa}</span>
                  </span>
                </div>

                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full border border-gold-deep/60 bg-gradient-to-b from-gold-light via-gold to-gold-deep px-7 py-3.5 shadow-[0_16px_40px_-14px_rgba(134,102,42,0.8)] transition-transform duration-500 hover:scale-[1.035]"
                >
                  <MapPin className="h-4.5 w-4.5 text-maroon-deep" aria-hidden="true" />
                  <span className="text-left leading-tight">
                    <span className="block font-tamil text-sm font-bold text-maroon-deep">{venue.buttonTa}</span>
                    <span className="block font-latin text-[0.62rem] font-bold uppercase tracking-[0.26em] text-maroon/80">
                      {venue.buttonEn}
                    </span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-maroon-deep/80 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <MapArt />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
