
import {
  BookOpen,
  Heart,
  Home,
  Images,
  Mail,
  MapPin,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import data from "@/data/weddingData.json";
import { cn } from "@/utils/cn";

const icons: Record<string, LucideIcon> = {
  home: Home,
  book: BookOpen,
  heart: Heart,
  message: Mail,
  image: Images,
  location: MapPin,
};

export default function SideNavigation() {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect active section
  useEffect(() => {
    const sections = data.nav
      .map((item) => document.getElementById(item.id))
      .filter(
        (element): element is HTMLElement => Boolean(element)
      );

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

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close menu with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigateToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* TOP-LEFT MENU BUTTON */}
      <button
        type="button"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        className="
          fixed left-4 top-4 z-[10001]
          flex h-11 w-11 items-center justify-center
          rounded-full border border-gold/50
          bg-maroon-deep/90 text-gold-light
          shadow-lg backdrop-blur-md
          transition-all duration-300
          hover:border-gold-light hover:text-ivory
          active:scale-95
          sm:left-6 sm:top-6
        "
      >
        {menuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* NAVIGATION MENU */}
      <div
        className={cn(
          "fixed left-4 top-[4.5rem] z-[10000] sm:left-6 sm:top-[5.25rem]",
          "origin-top-left transition-all duration-300",
          menuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label="Wedding sections"
          className="
            min-w-48 overflow-hidden rounded-2xl
            border border-gold/30
            bg-maroon-deep/95 p-2
            shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]
            backdrop-blur-xl
          "
        >
          <ul className="flex flex-col gap-1">
            {data.nav.map((item) => {
              const Icon = icons[item.icon] ?? Home;
              const active = activeId === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => navigateToSection(item.id)}
                    className={cn(
                      `
                        flex w-full items-center gap-3
                        rounded-xl border px-3 py-2.5
                        text-left transition-all duration-200
                      `,
                      active
                        ? `
                          border-gold-light/70
                          bg-gold/15 text-gold-light
                        `
                        : `
                          border-transparent text-ivory/85
                          hover:border-gold/25
                          hover:bg-gold/10 hover:text-gold-light
                        `
                    )}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      strokeWidth={active ? 2.2 : 1.8}
                      aria-hidden="true"
                    />

                    <span className="flex min-w-0 flex-col">
                      <span className="font-tamil text-sm font-semibold">
                        {item.ta}
                      </span>

                      <span className="font-latin text-[10px] uppercase tracking-[0.15em] text-gold-light/65">
                        {item.en}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
