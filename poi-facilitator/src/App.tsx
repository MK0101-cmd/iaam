import React, { useEffect, useState } from "react";
import SessionIntegratedUI from "@/SessionIntegratedUI";
import FacilitatorConsoleMockup from "./FacilitatorConsoleMocup";
import ParticipantExperience from "./ParticipantExperience";
import ParticipantSessionLive from "./ParticipantSessionLive";

export default function App() {
  const [route, setRoute] = useState<string>(() => location.hash.replace(/^#\/?/, "") || "studio");

  useEffect(() => {
    const onHashChange = () => setRoute(location.hash.replace(/^#\/?/, "") || "studio");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
    return <FacilitatorConsoleMockup />;
  }
  
  // Route to the integrated UI for various views
  if (["session", "library", "reports", "clients", "calendar", "marketplace", "settings"].includes(route)) {
    return <SessionIntegratedUI />;
  }
  
  // Default to studio console (journeys/home page)
  return <FacilitatorConsoleMockup />;
}