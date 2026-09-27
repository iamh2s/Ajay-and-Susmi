import { Heart } from "lucide-react";
import data from "@/data/weddingData.json";
import { GoldDivider, PillarStrip, ScrollReveal, SectionHeading, Vilakku } from "./decor";

function PersonCard({
  image,
  imageAlt,
  roleTa,
  roleEn,
  nameTa,
  nameEn,
  delay,
}: {
  image: string;
  imageAlt: string;
  roleTa: string;
  roleEn: string;
  nameTa: string;
  nameEn: string;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay} className="relative">
      {/* soft spotlight */}
      <span
        aria-hidden="true"
        className="absolute -inset-8 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_42%,rgba(217,190,124,0.2),transparent_72%)] blur-xl"
      />
      <div className="relative">
        {/* arch frame */}
        <div className="relative mx-auto max-w-sm rounded-t-[11rem] rounded-b-3xl border border-gold/55 bg-maroon-deep/60 p-2.5 shadow-[0_36px_80px_-32px_rgba(0,0,0,0.75)] sm:max-w-md">
          <svg viewBox="0 0 24 30" aria-hidden="true" className="absolute -top-6 left-1/2 z-10 h-7 w-6 -translate-x-1/2 fill-gold-light drop-shadow-[0_0_8px_rgba(217,190,124,0.55)]">
            <path d="M12 0c1.6 2.4 1.6 4.2 0 6.4C10.4 4.2 10.4 2.4 12 0Z" />
            <path d="M7 8.5h10l1.4 2.4c2.2 1.6 3.6 4 3.6 6.6 0 5.2-4.4 8-10 8s-10-2.8-10-8c0-2.6 1.4-5 3.6-6.6L7 8.5Z" />
          </svg>
          <div className="overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-gold/40">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.045]"
              style={{ objectPosition: "center 10%",marginLeft: "-12px" }}
            />
          </div>
        </div>

        {/* name plate */}
        <div className="relative z-10 mx-auto -mt-7 max-w-xs rounded-2xl border border-gold/45 bg-maroon-deep/88 px-6 py-5 text-center shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:max-w-sm">
          <p className="font-tamil text-xs font-semibold tracking-[0.2em] text-gold-light">{roleTa}</p>
          <p className="mt-0.5 font-latin text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-gold-light/70">
            {roleEn}
          </p>
          <GoldDivider motif="diamond" className="mt-3 text-gold/80" widthClass="w-28" />
          <h3 className="mt-3 font-tamil text-2xl font-bold leading-snug text-ivory sm:text-[1.7rem]">{nameTa}</h3>
          <p className="mt-1 font-latin text-base italic tracking-wide text-gold-light/90 sm:text-lg">{nameEn}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function CoupleSection() {
  const { coupleSection, couple } = data;
  return (
    <section
      id="couple"
      aria-label={`${coupleSection.headingTa} — ${coupleSection.headingEn}`}
      className="velvet-texture relative overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden="true" className="kolam-dots absolute inset-0 opacity-60" />
      <PillarStrip className="absolute inset-x-0 top-0 h-8 w-full text-gold/45" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading ta={coupleSection.headingTa} en={coupleSection.headingEn} tone="light" />
        </ScrollReveal>

        <div className="relative mt-20 grid gap-20 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* heart medallion between the panels */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center md:flex"
          >
            <span className="hairline-gold h-28 w-px bg-none" style={{ background: "linear-gradient(transparent, rgba(217,190,124,0.7))" }} />
            <span className="my-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold-light/70 bg-maroon-deep shadow-[0_0_26px_rgba(217,190,124,0.35)]">
              <Heart className="h-5 w-5 fill-gold text-gold" />
            </span>
            <span className="h-28 w-px" style={{ background: "linear-gradient(rgba(217,190,124,0.7), transparent)" }} />
          </div>

          <PersonCard
            image={couple.bride.image}
            imageAlt={couple.bride.imageAlt}
            roleTa={couple.bride.roleTa}
            roleEn={couple.bride.roleEn}
            nameTa="சுஷ்மிதா"
            nameEn={couple.bride.fullEnglish}
            delay={0.05}
          />
          <PersonCard
            image={couple.groom.image}
            imageAlt={couple.groom.imageAlt}
            roleTa={couple.groom.roleTa}
            roleEn={couple.groom.roleEn}
            nameTa={couple.groom.tamil}
            nameEn={couple.groom.english}
            delay={0.18}
          />
        </div>

        <div aria-hidden="true" className="mt-20 flex justify-center gap-10 opacity-90">
          <Vilakku className="h-16 w-auto sm:h-20" />
          <Vilakku className="hidden h-16 w-auto sm:h-20 md:block" />
          <Vilakku className="h-16 w-auto sm:h-20" />
        </div>
      </div>
    </section>
  );
}
