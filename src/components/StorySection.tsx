import { motion, useReducedMotion } from "framer-motion";
import data from "@/data/weddingData.json";
import { GoldDivider, MangoToran, ScrollReveal, SectionHeading } from "./decor";
import { cn } from "@/utils/cn";

function ChapterImage({ src, alt, flip }: { src: string; alt: string; flip: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -inset-3 rounded-t-[9rem] rounded-b-2xl border border-gold/35 md:-inset-3.5"
      />
      <div className="relative overflow-hidden rounded-t-[8.5rem] rounded-b-2xl border border-gold/55 bg-maroon-deep/10 p-2 shadow-[0_26px_60px_-30px_rgba(46,8,16,0.55)]">
        <div className="relative overflow-hidden rounded-t-[7.8rem] rounded-b-xl">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ scale: reduce ? 1 : 1.12, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[16/11] w-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* golden wipe */}
          <motion.span
            aria-hidden="true"
            initial={{ x: "0%" }}
            whileInView={{ x: flip ? "-102%" : "102%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
            className="absolute inset-0 bg-gradient-to-r from-gold-deep via-gold to-gold-light"
          />
        </div>
      </div>
    </div>
  );
}

export default function StorySection() {
  const { story } = data;
  return (
    <section id="story" aria-label={`${story.headingTa} — ${story.headingEn}`} className="paper-texture relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="kolam-dots-ivory absolute inset-0" />
      <MangoToran className="absolute left-1/2 top-2 w-60 -translate-x-1/2 opacity-80 sm:w-80" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={story.headingTa} en={story.headingEn} />
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="font-tamil text-base leading-relaxed text-maroon/85 sm:text-lg">{story.introTa}</p>
          <p className="mt-1.5 font-latin text-sm italic text-ink/60 sm:text-base">{story.introEn}</p>
        </ScrollReveal>

        {/* timeline */}
        <div className="relative mt-16 sm:mt-24">
          {/* temple-inspired vertical line */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-transparent via-gold to-transparent md:left-1/2"
          />
          <span
            aria-hidden="true"
            className="absolute left-[17px] top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-gold/30 to-transparent md:left-[calc(50%-2px)]"
          />

          <ol className="space-y-16 sm:space-y-24">
            {story.chapters.map((chapter, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={chapter.number} className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16 lg:gap-x-24">
                  {/* timeline node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-10 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-ivory shadow-[0_0_0_4px_rgba(245,235,221,1)] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" />
                  </span>

                  <div className={cn("pl-12 md:pl-0", flip && "md:order-2")}>
                    <ScrollReveal>
                      <ChapterImage src={chapter.image} alt={chapter.imageAlt} flip={flip} />
                    </ScrollReveal>
                  </div>

                  <div className={cn("relative mt-7 pl-12 md:mt-0 md:pl-0", flip ? "md:order-1 md:text-right" : "")}>
                    <ScrollReveal delay={0.12}>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -top-12 select-none font-latin text-8xl font-bold text-gold/20 md:-top-16 md:text-9xl",
                          flip ? "right-0" : "left-10 md:left-0"
                        )}
                      >
                        {chapter.number}
                      </span>
                      <div className={cn("flex items-center gap-3", flip && "md:flex-row-reverse")}>
                        <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
                        <span className="font-latin text-xs font-semibold uppercase tracking-[0.34em] text-gold-deep">
                          {chapter.titleEn}
                        </span>
                      </div>
                      <h3 className="mt-3 font-tamil text-2xl font-bold leading-snug text-maroon sm:text-3xl">
                        {chapter.titleTa}
                      </h3>
                      <p className="mt-3 font-tamil text-[0.95rem] leading-relaxed text-ink/80 sm:text-base">
                        {chapter.textTa}
                      </p>
                      <div className={cn("mt-4", flip && "md:flex md:justify-end")}>
                        <GoldDivider motif="diamond" className="text-gold-deep/70" widthClass="w-32" />
                      </div>
                      <p className="mt-3 font-latin text-sm font-medium italic tracking-wide text-gold-deep sm:text-base">
                        {chapter.titleEn}
                      </p>
                      <p className="mt-1.5 font-latin text-sm leading-relaxed text-ink/60 sm:text-[0.95rem]">
                        {chapter.textEn}
                      </p>
                    </ScrollReveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
