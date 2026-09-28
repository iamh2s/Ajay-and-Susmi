import { Heart, ExternalLink, Phone } from "lucide-react";
import data from "@/data/weddingData.json";
import {
  GoldDivider,
  Gopuram,
  Petals,
  ScrollReveal,
  Vilakku,
} from "./decor";

export default function FinalSection() {
  const { final, couple, credit } = data;

  return (
    <footer id = 'footer'
      aria-label={`${final.headingTa} — ${final.headingEn}`}
      className="velvet-texture relative overflow-hidden pt-24 sm:pt-32"
    >
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div
        aria-hidden="true"
        className="kolam-dots absolute inset-0 opacity-40"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.12),transparent)]"
      />

      <Gopuram
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 w-[34rem] max-w-[130vw] -translate-x-1/2 text-gold-light/10"
      />

      <Petals count={14} />

      {/* =========================================================
          FINAL MESSAGE
      ========================================================= */}

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Heading */}
        <ScrollReveal>
          <h2 className="pb-2 font-tamil text-5xl font-bold text-gold-brush sm:text-6xl">
            {final.headingTa}
          </h2>

          <p className="mt-2 font-latin text-xs font-semibold uppercase tracking-[0.5em] text-gold-light/85 sm:text-sm">
            {final.headingEn}
          </p>
        </ScrollReveal>

        {/* Message */}
        <ScrollReveal delay={0.15} className="mt-8">
          <p className="font-tamil text-lg leading-relaxed text-ivory sm:text-xl">
            {final.messageTa}
          </p>

          <p className="mt-2 font-latin text-base italic text-ivory/70 sm:text-lg">
            {final.messageEn}
          </p>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal
          delay={0.25}
          className="mt-10 flex flex-col items-center"
          aria-hidden="true"
        >
          <GoldDivider
            motif="lotus"
            className="text-gold"
            widthClass="w-52 sm:w-64"
          />
        </ScrollReveal>

        {/* Couple Names */}
        <ScrollReveal delay={0.3} className="mt-8">
          <p className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 font-tamil text-xl font-bold text-ivory sm:text-2xl">
            <span>{couple.bride.tamil}</span>

            <Heart
              className="h-4 w-4 fill-gold text-gold"
              aria-hidden="true"
            />

            <span>{couple.groom.tamil}</span>
          </p>

          <p className="mt-3 font-latin text-lg italic text-gold-light sm:text-xl">
            {final.signoffEn}
          </p>
        </ScrollReveal>

        {/* Traditional Lamps */}
        <ScrollReveal
          delay={0.35}
          className="mt-10 flex items-end justify-center gap-8"
          aria-hidden="true"
        >
          <Vilakku className="h-16 w-auto sm:h-20" />

          <Vilakku className="hidden h-16 w-auto sm:block sm:h-24" />

          <Vilakku className="h-16 w-auto sm:h-20" />
        </ScrollReveal>
      </div>

      {/* =========================================================
          DEVELOPER CREDIT CARD
      ========================================================= */}

      <ScrollReveal delay={0.45} className="relative mt-20 px-4 sm:mt-24">
        {/* Top separator */}
        <div className="mx-auto mb-10 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

        {/* Developer Card */}
        <div className="mx-auto w-full max-w-[560px]">
          <div
            className="
              relative overflow-hidden rounded-[22px]
              border border-gold/40
              bg-gradient-to-b
              from-[#18070a]/95
              via-[#100306]/95
              to-[#080103]/95
              px-6 py-9
              shadow-[0_0_35px_rgba(180,130,45,0.10)]
              sm:px-10 sm:py-11
            "
          >
            {/* Inner border */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-2
                rounded-[17px]
                border border-gold/15
              "
            />

            {/* Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-1/2 top-0
                h-32 w-64
                -translate-x-1/2
                rounded-full
                bg-gold/5
                blur-3xl
              "
            />

            {/* Corner Decorations */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-5 top-5
                h-3 w-3
                border-l border-t border-gold/30
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-5 top-5
                h-3 w-3
                border-r border-t border-gold/30
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-5 left-5
                h-3 w-3
                border-b border-l border-gold/30
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-5 right-5
                h-3 w-3
                border-b border-r border-gold/30
              "
            />

            {/* Card Content */}
            <div className="relative z-10 text-center">
              {/* Label */}
              <p
                className="
                  font-latin
                  text-[0.60rem]
                  font-medium
                  uppercase
                  tracking-[0.38em]
                  text-gold-light/70
                  sm:text-[0.68rem]
                "
              >
                {"Website Crafted & Developed By"}
              </p>

              {/* Developer Name */}
              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4 block
                  font-serif
                  text-2xl
                  font-medium
                  tracking-wide
                  text-[#f5df9a]
                  transition-all
                  duration-300
                  hover:text-gold-light
                  hover:drop-shadow-[0_0_10px_rgba(245,223,154,0.25)]
                  sm:text-3xl
                "
              >
                {credit.name}
              </a>

              {/* Gold Divider */}
              <div
                aria-hidden="true"
                className="mx-auto mt-5 flex items-center justify-center gap-3"
              >
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />

                <span className="h-1 w-1 rotate-45 border border-gold/60" />

                <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
              </div>

              {/* Description */}
              <p
                className="
                  mx-auto mt-6
                  max-w-[390px]
                  font-serif
                  text-sm
                  leading-7
                  text-ivory/65
                  sm:text-[0.95rem]
                "
              >
                Designed with creativity, elegance, and love to
                <br className="hidden sm:block" />
                celebrate this beautiful beginning.
              </p>

              {/* Buttons */}
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:flex-row
                "
              >
                {/* Portfolio */}
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    min-w-[175px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-gold/60
                    bg-gold/5
                    px-6
                    py-3
                    font-latin
                    text-[0.63rem]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-gold-light
                    transition-all
                    duration-300
                    hover:border-gold
                    hover:bg-gold/10
                    hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]
                  "
                >
                  <span>View Portfolio</span>

                  <ExternalLink
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                    aria-hidden="true"
                  />
                </a>

                {/* Call Developer */}
                <a
                  href="tel:7010458527"
                  className="
                    group
                    inline-flex
                    min-w-[200px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-ivory/15
                    bg-transparent
                    px-6
                    py-3
                    font-latin
                    text-[0.63rem]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-ivory/65
                    transition-all
                    duration-300
                    hover:border-gold/40
                    hover:text-gold-light
                  "
                >
                  <Phone
                    className="
                      h-3.5
                      w-3.5
                      opacity-70
                      transition-transform
                      duration-300
                      group-hover:rotate-12
                    "
                    aria-hidden="true"
                  />

                  <span>Call Developer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* =========================================================
          FINAL FOOTER SIGNATURE
      ========================================================= */}

      <div className="relative mt-10 border-t border-gold/20 px-4 pb-8 pt-6 sm:mt-12 sm:pt-7">
        <div className="mx-auto max-w-5xl text-center">
          {/* Couple Signature */}
          <p
            className="
              font-latin
              text-[0.55rem]
              uppercase
              tracking-[0.25em]
              text-gold/55
              sm:text-[0.65rem]
              sm:tracking-[0.30em]
            "
          >
            <span>Ajay &amp; Susmi</span>

            <span className="mx-2 text-gold/30">•</span>

            <span>MMXXVI</span>

            <span className="mx-2 text-gold/30">•</span>

            <span>Crafted With Love &amp; Blessings</span>
          </p>

          {/* Website By */}
          <p
            className="
              mt-4
              font-latin
              text-[0.55rem]
              uppercase
              tracking-[0.20em]
              text-ivory/40
              sm:text-[0.63rem]
              sm:tracking-[0.22em]
            "
          >
            Website by{" "}
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-gold-light/75
                underline
                decoration-gold/40
                underline-offset-4
                transition-colors
                duration-300
                hover:text-gold-light
              "
            >
              {credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}