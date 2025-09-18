import React, { useEffect, useState } from "react";
import SessionIntegratedUI from "@/SessionIntegratedUI";
import FacilitatorConsoleMockup from "./FacilitatorConsoleMocup";
import ParticipantExperience from "./ParticipantExperience";
import ParticipantSessionLive from "./ParticipantSessionLive";
import { MultilingualDemo } from "./components/MultilingualDemo";
import { Header } from "./components/Header";
import { useTranslation } from './hooks/useTranslation';
import './i18n/config'; // Initialize i18n

export default function App() {
  const [route, setRoute] = useState<string>(() => location.hash.replace(/^#\/?/, "") || "studio");
  const { isRTL, getDirectionClasses } = useTranslation();

  useEffect(() => {
    const onHashChange = () => setRoute(location.hash.replace(/^#\/?/, "") || "studio");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Apply RTL/LTR direction to document
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Add demo route for multilingual showcase
  if (route === "demo" || route === "multilingual") {
    return (
      <div className={getDirectionClasses()}>
        <MultilingualDemo />
      </div>
    );
  }

  // Route to live participant session
  if (route === "participant/session/live") {
    return <ParticipantSessionLive />;
  }
  
  // Route to participant experience
  if (route.startsWith("participant")) {
    return <ParticipantExperience />;
  }
  
  // Route to studio console
  if (route === "studio" || route === "facilitator") {
    return (
      <div className={getDirectionClasses()}>
        <Header 
          title="Points of You AI Studio" 
          subtitle="Multilingual Version - Switch languages using the globe icon"
          showLanguageSwitcher={true}
        />
        <FacilitatorConsoleMockup />
      </div>
    );
  }
  
  // Route to the integrated UI for various views
  if (["session", "library", "reports", "clients", "calendar", "marketplace", "settings"].includes(route)) {
    return (
      <div className={getDirectionClasses()}>
        <Header showLanguageSwitcher={true} />
        <SessionIntegratedUI />
      </div>
    );
  }
  
  // Default to studio console (journeys/home page) with header
  return (
    <div className={getDirectionClasses()}>
      <Header 
        title="Points of You AI Studio" 
        subtitle="Multilingual Version - Try #demo to see all features"
        showLanguageSwitcher={true}
      />
      <FacilitatorConsoleMockup />
    </div>
  );
}

