
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import CountdownSection from "./components/CountdownSection";
import CoupleSection from "./components/CoupleSection";
import FamilySection from "./components/FamilySection";
import FinalSection from "./components/FinalSection";
import GallerySection from "./components/GallerySection";
import Guide from "./components/Guide";
import HeroSection from "./components/HeroSection";
import InvitationIntro from "./components/InvitationIntro";
import InvitationSection from "./components/InvitationSection";
import MusicPlayer from "./components/MusicPlayer";
import SideNavigation from "./components/SideNavigation";
import StorySection from "./components/StorySection";
import ContactButton from "./components/Contact";
import { SvgDefs } from "./components/decor";

export default function App() {
  const [opened, setOpened] = useState(false);

  // Open invitation
  const handleOpenStart = useCallback(() => {
    window.dispatchEvent(new CustomEvent("wedding:open"));
  }, []);

  const handleOpened = useCallback(() => {
    setOpened(true);
  }, []);

  // Lock page scrolling while intro is open
  useEffect(() => {
    document.documentElement.classList.toggle(
      "scroll-locked",
      !opened
    );

    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [opened]);

  // Auto-scroll when the user is inactive for 10 seconds
  useEffect(() => {
    if (!opened) return;

    let inactivityTimer;
    let isAutoScrolling = false;
    let autoScrollResetTimer;

    const clearInactivityTimer = () => {
      clearTimeout(inactivityTimer);
    };

    const startInactivityTimer = () => {
      clearInactivityTimer();

      inactivityTimer = setTimeout(() => {
        if (
          document.hidden ||
          document.documentElement.classList.contains("scroll-locked")
        ) {
          return;
        }

        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight;

        // Don't scroll if already at the bottom
        if (window.scrollY >= maxScroll - 2) {
          return;
        }

        isAutoScrolling = true;

        window.scrollBy({
          top: 100,
          behavior: "smooth",
        });

        clearTimeout(autoScrollResetTimer);

        autoScrollResetTimer = setTimeout(() => {
          isAutoScrolling = false;
          startInactivityTimer();
        }, 1200);
      }, 10000);
    };

    const handleScroll = () => {
      // Ignore scroll events caused by our own automatic movement
      if (isAutoScrolling) return;

      startInactivityTimer();
    };

    const handleUserActivity = () => {
      clearTimeout(autoScrollResetTimer);
      isAutoScrolling = false;
      startInactivityTimer();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInactivityTimer();
        clearTimeout(autoScrollResetTimer);
      } else {
        isAutoScrolling = false;
        startInactivityTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("wheel", handleUserActivity, {
      passive: true,
    });

    window.addEventListener("touchstart", handleUserActivity, {
      passive: true,
    });

    window.addEventListener("pointerdown", handleUserActivity, {
      passive: true,
    });

    window.addEventListener("keydown", handleUserActivity);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // Start the initial 10-second timer
    startInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(autoScrollResetTimer);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("pointerdown", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [opened]);

  return (
    <>
      {/* SVG DEFINITIONS */}
      <SvgDefs />

      {/* INVITATION INTRO */}
      <AnimatePresence>
        {!opened && (
          <InvitationIntro
            key="invitation-intro"
            onOpenStart={handleOpenStart}
            onOpened={handleOpened}
          />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main id="main">
        <HeroSection active={opened} />

        <StorySection />

        <CoupleSection />

        <FamilySection />

        <InvitationSection />

        <CountdownSection />

        <GallerySection />

        {/* <VenueSection /> */}

        <FinalSection />
      </main>

      {/* MUSIC */}
      <MusicPlayer opened={opened} />

      {/* FLOATING UI */}
      {opened && (
        <>
          <SideNavigation />

          <ContactButton visible={true} />

          <Guide />
        </>
      )}
    </>
  );
}
