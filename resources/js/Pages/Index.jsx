import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { ContentProvider } from "@/Utils/content-context.jsx";
import { DEFAULT_CONTENT } from "@/Utils/wedding-content.js";
import SplashDoors from "@/Components/splash-doors.jsx";
import SiteNav from "@/Components/site-nav.jsx";
import Hero from "@/Components/hero.jsx";
import OurStory from "@/Components/our-story.jsx";
import Families from "@/Components/families.jsx";
import Celebrations from "@/Components/celebrations.jsx";
import Countdown from "@/Components/countdown.jsx";
import SaveTheDate from "@/Components/save-the-date.jsx";
import Venue from "@/Components/venue.jsx";
import Gallery from "@/Components/gallery.jsx";
import Rsvp from "@/Components/rsvp.jsx";
import Wishes from "@/Components/wishes.jsx";
import SiteTheme from "@/Components/site-theme.jsx";
import FloatingActions from "@/Components/floating-actions.jsx";
import {
  FinalInvitation,
  Footer,
  ParentsBlessings,
} from "@/Components/closing-sections.jsx";

const GUEST_KEY = "ka-guest-name";

export default function Index({ initialWishes = [], siteContent = null }) {
  const [guest, setGuest] = useState(null);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(GUEST_KEY);
      if (stored) {
        setGuest(stored);
      }
      setHasCheckedStorage(true);
    }
  }, []);

  const enter = (name) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(GUEST_KEY, name);
    }
    setGuest(name);
  };

  const content = siteContent || DEFAULT_CONTENT;

  return (
    <ContentProvider value={content}>
      <SiteTheme>
        <Toaster richColors position="top-center" />

        {/* Splash Doors shown initially until guest enters name */}
        {hasCheckedStorage && guest === null && <SplashDoors onEnter={enter} />}

        <SiteNav />

        <main>
          <Hero guest={guest ?? ""} />
          <OurStory />
          <Families />
          <Celebrations />
          <Countdown />
          <SaveTheDate />
          <Venue />
          <Gallery />
          <FinalInvitation />
          <ParentsBlessings />
          <Wishes guest={guest ?? ""} initialWishes={initialWishes} />
          <Rsvp guest={guest ?? ""} />
        </main>

        <Footer />
        <FloatingActions />
      </SiteTheme>
    </ContentProvider>
  );
}
