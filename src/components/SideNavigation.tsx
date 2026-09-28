import {
  BookOpen,
  Heart,
  Home,
  Images,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import data from "@/data/weddingData.json";
import { cn } from "@/utils/cn";

/* =========================================================
   ICON MAPPING
========================================================= */

const icons: Record<string, LucideIcon> = {
  home: Home,
  book: BookOpen,
  heart: Heart,
  message: Mail,
  image: Images,
  location: MapPin,
};

/* =========================================================
   SIDE NAVIGATION
========================================================= */

export default function SideNavigation() {
  const [activeId, setActiveId] = useState<string>("home");
  const [visible, setVisible] = useState(false);

  /* =======================================================
     SHOW / HIDE NAVIGATION
  ======================================================= */

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =======================================================
     DETECT ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    const sections = data.nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-42% 0px -52% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  return (
    <nav
      aria-label="Wedding sections"
      className={cn(
        "fixed right-3 top-1/2 z-40 -translate-y-1/2",
        "transition-all duration-700",
        "sm:right-5",
        visible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-4 opacity-0"
      )}
    >
      <ul
        className="
          flex flex-col items-center gap-2.5
          rounded-full
          border border-gold/30
          bg-maroon-deep/72
          px-1.5 py-3
          shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]
          backdrop-blur-md
        "
      >
        {data.nav.map((item) => {
          const Icon = icons[item.icon] ?? Home;
          const active = activeId === item.id;

          return (
            <li
              key={item.id}
              className="group relative"
            >
              {/* =================================================
                  NAV BUTTON
              ================================================= */}

              <button
                type="button"
                aria-label={`${item.ta} — ${item.en}`}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className={cn(
                  `
                    flex
                    h-9 w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-500
                    sm:h-10
                    sm:w-10
                  `,
                  active
                    ? `
                      scale-110
                      border-gold-light
                      bg-gradient-to-b
                      from-gold-light
                      to-gold
                      text-maroon-deep
                      shadow-[0_0_18px_rgba(217,190,124,0.45)]
                    `
                    : `
                      border-gold/35
                      bg-transparent
                      text-gold-light/80
                      hover:border-gold-light/70
                      hover:text-gold-light
                    `
                )}
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={active ? 2.2 : 1.8}
                  aria-hidden="true"
                />
              </button>

              {/* =================================================
                  TOOLTIP
              ================================================= */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  right-full
                  top-1/2
                  mr-3
                  hidden
                  -translate-y-1/2
                  whitespace-nowrap
                  rounded-full
                  border
                  border-gold/40
                  bg-maroon-deep/90
                  px-3
                  py-1.5
                  opacity-0
                  shadow-lg
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  group-hover:-translate-x-1
                  group-hover:opacity-100
                  group-focus-within:opacity-100
                  md:block
                "
              >
                <span
                  className="
                    font-tamil
                    text-xs
                    font-semibold
                    text-ivory
                  "
                >
                  {item.ta}
                </span>

                <span
                  className="
                    ml-2
                    font-latin
                    text-[0.62rem]
                    uppercase
                    tracking-[0.2em]
                    text-gold-light/80
                  "
                >
                  {item.en}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}