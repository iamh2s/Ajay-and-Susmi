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
// import VenueSection from "./components/VenueSection";

/* =========================================================
   CONTACT BUTTON + POPUP
========================================================= */

import ContactButton from "./components/Contact";

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

        {/* =================================================
            HERO
        ================================================= */}

        <HeroSection active={opened} />

        {/* =================================================
            STORY
        ================================================= */}

        <StorySection />

        {/* =================================================
            COUPLE
        ================================================= */}

        <CoupleSection />

        {/* =================================================
            FAMILY
        ================================================= */}

        <FamilySection />

        {/* =================================================
            INVITATION
        ================================================= */}

        <InvitationSection />

        {/* =================================================
            COUNTDOWN
        ================================================= */}

        <CountdownSection />

        {/* =================================================
            GALLERY
        ================================================= */}

        <GallerySection />

        {/* =================================================
            VENUE
        ================================================= */}

        {/* <VenueSection /> */}

        {/* =================================================
            FINAL
        ================================================= */}

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
          {/* =================================================
              SCROLL HINT
          ================================================= */}

          <ScrollHint />

          {/* =================================================
              SIDE NAVIGATION
          ================================================= */}

          <SideNavigation />

          {/* =================================================
              CONTACT BUTTON
              
              The button stays fixed on the LEFT side.
              Clicking it opens the contact popup.
          ================================================= */}

          <ContactButton />
        </>
      )}
    </>
  );
}