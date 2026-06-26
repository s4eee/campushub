import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEvents } from "./hooks/useEvents";
import { useBookmarks } from "./hooks/useBookmarks";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import "./App.css";

// Minimal page-level routing. No react-router yet — see note below.
// "dashboard": the student-facing browse view (also default for organizers).
// "manage": organizer-only event management view.
//
// useEvents/useBookmarks are created ONCE here and passed down, so creating
// or editing an event in "manage" is immediately reflected in "dashboard"
// without needing to remount either page.
function Gate() {
  const { user } = useAuth();
  const [page, setPage] = useState("dashboard");
  const eventsApi = useEvents();
  const bookmarksApi = useBookmarks();

  if (!user) return <Login />;

  if (page === "manage" && user.role === "organizer") {
    return <OrganizerDashboard onNavigate={setPage} eventsApi={eventsApi} />;
  }
  return <Dashboard onNavigate={setPage} eventsApi={eventsApi} bookmarksApi={bookmarksApi} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
