import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

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
import ContactButton from "./components/Contact";
import { SvgDefs } from "./components/decor";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showContact, setShowContact] = useState(false);

  /* =========================================================
     OPEN INVITATION
  ========================================================= */

  const handleOpenStart = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("wedding:open")
    );
  }, []);

  const handleOpened = useCallback(() => {
    setOpened(true);
  }, []);

  /* =========================================================
     LOCK PAGE SCROLL WHILE INTRO IS OPEN
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

  /* =========================================================
     CONTACT VISIBILITY

     SAME TRIGGER AS SIDE NAVIGATION

     SideNavigation:
       window.scrollY > window.innerHeight * 0.55

     Contact:
       window.scrollY > window.innerHeight * 0.55
  ========================================================= */

  useEffect(() => {
    if (!opened) {
      setShowContact(false);
      return;
    }

    const handleScroll = () => {
      setShowContact(
        window.scrollY > window.innerHeight * 0.55
      );
    };

    // Check immediately
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [opened]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          SVG DEFINITIONS
      ===================================================== */}

      <SvgDefs />

      {/* =====================================================
          INVITATION INTRO
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
          MAIN CONTENT
      ===================================================== */}

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

      {/* =====================================================
          MUSIC
      ===================================================== */}

      <MusicPlayer opened={opened} />

      {/* =====================================================
          FLOATING UI
      ===================================================== */}

      {opened && (
        <>
          {/* =================================================
              SCROLL HINT
          ================================================= */}

          <ScrollHint />

          {/* =================================================
              RIGHT SIDE NAVIGATION

              This already handles its own animation.
          ================================================= */}

          <SideNavigation />

          {/* =================================================
              LEFT CONTACT BUTTON

              IMPORTANT:
              No wrapper here.

              ContactButton itself handles:
              - fixed positioning
              - left positioning
              - animation
              - opacity
          ================================================= */}

          <ContactButton visible={showContact} />
        </>
      )}
    </>
  );
}