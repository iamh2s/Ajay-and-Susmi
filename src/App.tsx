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
// import ScrollHint from "./components/ScrollHint";
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
      document.documentElement.classList.remove(
        "scroll-locked"
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
          {/* Navigation visible from Hero onward */}
          <SideNavigation />

          {/* Contact button visible from Hero onward */}
          <ContactButton visible={true} />

          {/* Responsive bilingual website guide */}
          <Guide />
        </>
      )}
    </>
  );
}
