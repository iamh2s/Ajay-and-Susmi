import {
  ExternalLink,
  Heart,
  MapPin,
} from "lucide-react";

import data from "@/data/weddingData.json";

import {
  CornerOrnaments,
  GoldDivider,
  Gopuram,
  ScrollReveal,
  SectionHeading,
} from "./decor";

/* =========================================================
   EVENT DATA
========================================================= */

const events = [
  {
    titleTa: "வரவேற்பு",
    titleEn: "Reception",

    dateTa: "நவம்பர் 14",
    dateEn: "November 14 · Saturday",

    timeTa: "மாலை 6.00 மணி",
    timeEn: "6:00 PM",

    venueTa: "அதே திருமண மண்டபத்தில்",
    venueEn: "At the same venue",
  },

  {
    titleTa: "திருமணம்",
    titleEn: "Marriage",

    dateTa: null as string | null,
    dateEn: null as string | null,

    timeTa: null as string | null,
    timeEn: null as string | null,

    venueTa: null as string | null,
    venueEn: null as string | null,
  },
];

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  ev,
}: {
  ev: (typeof events)[0];
}) {
  return (
    <div
      className="
        w-full
        rounded-xl
        border
        border-gold/40
        bg-ivory-deep/60
        px-4
        py-3
        shadow-[inset_0_1px_6px_rgba(176,141,60,0.1)]
      "
    >
      {/* Title Tamil */}

      <p className="font-tamil text-base font-bold text-maroon">
        {ev.titleTa}
      </p>

      {/* Title English */}

      <p
        className="
          font-latin
          text-[0.6rem]
          font-semibold
          uppercase
          tracking-[0.3em]
          text-gold-deep
        "
      >
        {ev.titleEn}
      </p>

      {/* Date */}

      {ev.dateTa && (
        <p className="mt-2 font-tamil text-sm font-bold text-ink/80">
          {ev.dateTa}
        </p>
      )}

      {ev.dateEn && (
        <p className="font-latin text-[0.65rem] italic text-ink/55">
          {ev.dateEn}
        </p>
      )}

      {/* Time */}

      {ev.timeTa && (
        <p className="mt-1 font-tamil text-sm text-maroon">
          {ev.timeTa}
        </p>
      )}

      {ev.timeEn && (
        <p className="font-latin text-[0.65rem] italic text-ink/55">
          {ev.timeEn}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   INVITATION SECTION
========================================================= */

export default function InvitationSection() {
  const { invitation, couple } = data;

  /* =======================================================
     PATCH MARRIAGE DATA FROM JSON
  ======================================================= */

  events[1].dateTa = invitation.dateTa;
  events[1].dateEn = invitation.dateEn;

  events[1].timeTa = invitation.timeTa;
  events[1].timeEn = invitation.timeEn;

  events[1].venueTa = invitation.venueTa;
  events[1].venueEn = invitation.venueEn;

  /* =======================================================
     GOOGLE MAPS LINK
     
     Replace this with your actual Google Maps URL.
  ======================================================= */

  const googleMapsUrl =
    "YOUR_GOOGLE_MAPS_LINK";

  return (
    <section
      id="invitation"
      aria-label={`${invitation.titleTa} — ${invitation.titleEn}`}
      className="
        velvet-texture
        relative
        w-full
        overflow-hidden
        py-16
        sm:py-24
      "
      style={{
        minHeight: "100%",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          kolam-dots
          absolute
          inset-0
          h-full
          w-full
          opacity-50
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-64
          bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,190,124,0.12),transparent)]
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">

          {/* =================================================
              SECTION HEADING
          ================================================== */}

          <ScrollReveal>
            <SectionHeading
              ta={invitation.titleTa}
              en={invitation.titleEn}
              tone="light"
            />
          </ScrollReveal>

          {/* =================================================
              MAIN CARD
          ================================================== */}

          <ScrollReveal
            delay={0.15}
            className="mt-10 w-full"
          >
            <div
              className="
                w-full
                rounded-[2rem]
                bg-gradient-to-b
                from-gold-light
                via-gold
                to-gold-deep
                p-[3px]
                shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]
              "
            >
              <div
                className="
                  gold-double-frame
                  paper-texture
                  relative
                  w-full
                  rounded-[calc(2rem-3px)]
                  border
                  border-gold-deep/40
                  px-4
                  py-10
                  text-center
                  sm:px-8
                  sm:py-12
                  md:px-12
                "
              >

                {/* =================================================
                    CORNER ORNAMENTS
                ================================================== */}

                <CornerOrnaments
                  className="text-gold-deep/75"
                  size="h-10 w-10 sm:h-14 sm:w-14"
                />

                {/* =================================================
                    GOPURAM
                ================================================== */}

                <Gopuram
                  className="
                    mx-auto
                    h-10
                    w-auto
                    text-gold-deep/65
                  "
                  aria-hidden="true"
                />

                {/* =================================================
                    SRI
                ================================================== */}

                <p
                  className="
                    text-gold-shimmer
                    mt-3
                    font-tamil
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  {invitation.sri}
                </p>

                <p
                  className="
                    mt-1
                    font-latin
                    text-[0.6rem]
                    font-semibold
                    uppercase
                    tracking-[0.38em]
                    text-gold-deep
                  "
                >
                  {invitation.sriEn}
                </p>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="mt-5 flex justify-center">
                  <GoldDivider
                    motif="kalasam"
                    className="text-gold-deep"
                  />
                </div>

                {/* =================================================
                    COUPLE
                ================================================== */}

                <div className="mt-6 space-y-1">

                  {/* Bride */}

                  <h4
                    className="
                      font-tamil
                      text-2xl
                      font-bold
                      text-maroon
                      sm:text-3xl
                    "
                  >
                    {couple.bride.tamil}
                  </h4>

                  <p
                    className="
                      font-latin
                      text-sm
                      italic
                      text-gold-deep
                    "
                  >
                    {couple.bride.english}
                  </p>

                  {/* Heart Divider */}

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      py-1.5
                    "
                    aria-hidden="true"
                  >
                    <span className="hairline-gold w-14" />

                    <Heart
                      className="
                        h-3.5
                        w-3.5
                        fill-gold-deep
                        text-gold-deep
                      "
                    />

                    <span className="hairline-gold w-14" />
                  </div>

                  {/* Groom */}

                  <h4
                    className="
                      font-tamil
                      text-2xl
                      font-bold
                      text-maroon
                      sm:text-3xl
                    "
                  >
                    {couple.groom.inviteTamil}
                  </h4>

                  <p
                    className="
                      font-latin
                      text-sm
                      italic
                      text-gold-deep
                    "
                  >
                    {couple.groom.english}
                  </p>
                </div>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="mt-6 flex justify-center">
                  <GoldDivider
                    motif="diamond"
                    className="text-gold-deep/80"
                    widthClass="w-36"
                  />
                </div>

                {/* =================================================
                    TIMELINE
                ================================================== */}

                <div className="relative mt-8 w-full">

                  {/* =================================================
                      MOBILE TIMELINE
                  ================================================== */}

                  <div className="flex flex-col gap-0 sm:hidden">

                    <div className="relative flex flex-col items-center">

                      {events.map((ev, i) => (
                        <div
                          key={ev.titleEn}
                          className="
                            relative
                            flex
                            w-full
                            flex-col
                            items-center
                            pb-8
                            last:pb-0
                          "
                        >

                          {/* Dot */}

                          <span
                            className="
                              z-10
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                              rounded-full
                              border-2
                              border-gold-deep
                              bg-ivory
                              text-[0.55rem]
                              font-bold
                              text-gold-deep
                              shadow-[0_0_0_3px_rgba(176,141,60,0.2)]
                            "
                          >
                            {i + 1}
                          </span>

                          {/* Spine */}

                          {i < events.length - 1 && (
                            <div
                              className="
                                h-8
                                w-px
                                bg-gradient-to-b
                                from-gold
                                to-gold/40
                              "
                            />
                          )}

                          {/* Event Card */}

                          <div className="mt-3 w-full max-w-xs">
                            <EventCard ev={ev} />
                          </div>

                        </div>
                      ))}

                    </div>
                  </div>

                  {/* =================================================
                      DESKTOP TIMELINE
                  ================================================== */}

                  <div className="relative hidden sm:block">

                    {/* Vertical Spine */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        left-1/2
                        top-3
                        h-[calc(100%-1.5rem)]
                        w-px
                        -translate-x-1/2
                        bg-gradient-to-b
                        from-gold
                        via-gold/60
                        to-gold
                      "
                    />

                    {events.map((ev, i) => {
                      const isLeft = i % 2 === 0;

                      return (
                        <div
                          key={ev.titleEn}
                          className="
                            relative
                            grid
                            grid-cols-[1fr_2rem_1fr]
                            items-start
                            gap-x-4
                            pb-10
                            last:pb-0
                          "
                        >

                          {/* Left */}

                          <div className="flex items-start justify-end">
                            {isLeft && (
                              <EventCard ev={ev} />
                            )}
                          </div>

                          {/* Node */}

                          <div className="relative z-10 flex justify-center">

                            <span
                              className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                border-gold-deep
                                bg-ivory
                                text-[0.55rem]
                                font-bold
                                text-gold-deep
                                shadow-[0_0_0_3px_rgba(176,141,60,0.2)]
                              "
                            >
                              {i + 1}
                            </span>

                          </div>

                          {/* Right */}

                          <div className="flex items-start justify-start">
                            {!isLeft && (
                              <EventCard ev={ev} />
                            )}
                          </div>

                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* =================================================
                    VENUE
                ================================================== */}

                <div
                  className="
                    mt-8
                    w-full
                    rounded-xl
                    border
                    border-gold/45
                    bg-ivory-deep/70
                    px-4
                    py-4
                    shadow-[inset_0_2px_14px_rgba(176,141,60,0.14)]
                    sm:px-6
                    sm:py-5
                  "
                >

                  {/* Venue Header */}

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      text-gold-deep
                    "
                  >
                    <MapPin className="h-3.5 w-3.5" />

                    <span
                      className="
                        font-latin
                        text-[0.65rem]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                      "
                    >
                      Venue
                    </span>
                  </div>

                  {/* Venue Tamil */}

                  <p
                    className="
                      mt-1.5
                      font-tamil
                      text-base
                      font-bold
                      text-maroon
                      sm:text-lg
                    "
                  >
                    {invitation.venueTa}
                  </p>

                  {/* Venue English */}

                  <p
                    className="
                      font-latin
                      text-xs
                      italic
                      text-gold-deep
                      sm:text-sm
                    "
                  >
                    {invitation.venueEn}
                  </p>

                  {/* =================================================
                      TAMIL ADDRESS
                  ================================================== */}

                  <div className="mt-2 space-y-0.5">
                    {invitation.addressTa.map((line) => (
                      <p
                        key={line}
                        className="
                          font-tamil
                          text-xs
                          leading-relaxed
                          text-ink/80
                        "
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* =================================================
                      ENGLISH ADDRESS
                  ================================================== */}

                  <div className="mt-1 space-y-0.5">
                    {invitation.addressEn.map((line) => (
                      <p
                        key={line}
                        className="
                          font-latin
                          text-[0.65rem]
                          italic
                          text-ink/55
                          sm:text-xs
                        "
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* =================================================
                      GOOGLE MAPS BUTTON
                  ================================================== */}

                  <div className="mt-4 flex justify-center">

                    <a
                      href="https://maps.app.goo.gl/vHqe5hsDWC1PHozw8?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Google Maps location"
                      className="
                        group

                        inline-flex
                        items-center
                        justify-center
                        gap-2

                        rounded-full

                        border
                        border-gold-deep

                        bg-maroon

                        px-5
                        py-2.5

                        font-tamil
                        text-xs
                        font-bold

                        text-gold-light

                        shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)]

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-maroon/90
                        hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.7)]

                        active:scale-95
                      "
                    >

                      <MapPin
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                        aria-hidden="true"
                      />

                      <span>
                        வரைபடத்தில் காண்க
                      </span>

                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />

                    </a>

                  </div>
                </div>

                {/* =================================================
                    FINAL DIVIDER
                ================================================== */}

                <div
                  className="mt-7 flex justify-center"
                  aria-hidden="true"
                >
                  <GoldDivider
                    motif="lotus"
                    className="text-gold-deep"
                  />
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}