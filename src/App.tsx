import { AnimatePresence } from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import CountdownSection from "./components/CountdownSection";
import CoupleSection from "./components/CoupleSection";
import FamilySection from "./components/FamilySection";
import FinalSection from "./components/FinalSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import InvitationIntro from "./components/InvitationIntro";
import InvitationSection from "./components/InvitationSection";
import MusicPlayer from "./components/MusicPlayer";
import ScrollHint from "./components/ScrollHint";
import SideNavigation from "./components/SideNavigation";
import StorySection from "./components/StorySection";
import VenueSection from "./components/VenueSection";

/* IMPORTANT */
import ContactCard from "./components/ContactCard";

import { SvgDefs } from "./components/decor";

export default function App() {
  const [opened, setOpened] = useState(false);

  /* =========================================================
     USER TAPS "TOUCH TO OPEN"
  ========================================================= */

  const handleOpenStart = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("wedding:open")
    );
  }, []);

  /* =========================================================
     DOOR ANIMATION FINISHED
  ========================================================= */

  const handleOpened = useCallback(() => {
    setOpened(true);
  }, []);

  /* =========================================================
     SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    document.documentElement.classList.toggle(
      "scroll-locked",
      !opened
    );

    return () => {
      document.documentElement.classList.remove(
        "scroll-locked"
      );
    };
  }, [opened]);

  return (
    <>
      {/* =====================================================
          SVG DEFINITIONS
      ===================================================== */}

      <SvgDefs />

      {/* =====================================================
          INTRO / TOUCH TO OPEN
      ===================================================== */}

      <AnimatePresence>
        {!opened && (
          <InvitationIntro
            key="invitation-intro"
            onOpenStart={handleOpenStart}
            onOpened={handleOpened}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          MAIN INVITATION
      ===================================================== */}

      <main id="main">
        <HeroSection active={opened} />

        <StorySection />

        <CoupleSection />

        <FamilySection />

        <InvitationSection />

        {/* =================================================
            SEPARATE CONTACT CARD
        ================================================= */}

        <ContactCard />

        <CountdownSection />

        <GallerySection />

        <VenueSection />

        <FinalSection />
      </main>

      {/* =====================================================
          MUSIC
      ===================================================== */}

      <MusicPlayer opened={opened} />

      {/* =====================================================
          GLOBAL CONTROLS
      ===================================================== */}

      {opened && (
        <>
          <ScrollHint />

          <SideNavigation />
        </>
      )}
    </>
  );
}