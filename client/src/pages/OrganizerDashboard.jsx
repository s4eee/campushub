import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ORGS } from "../utils/constants";

import Navbar from "../components/layout/Navbar";
import EmptyState from "../components/layout/EmptyState";
import MyEventRow from "../components/events/MyEventRow";
import EventForm from "../components/events/EventForm";

// Organizer-only page: manage the events your organization has published.
// Students never see this page — Dashboard.jsx is their view.
// eventsApi is the same instance Dashboard.jsx uses (created once in App.js),
// so saving/deleting here is reflected there immediately.
export default function OrganizerDashboard({ onNavigate, eventsApi }) {
  const { user } = useAuth();
  const { events, loading, error, addEvent, editEvent, removeEvent } = eventsApi;

  const [formState, setFormState] = useState(null); // null | "new" | event object
  const [saving, setSaving] = useState(false);

  const currentOrg = ORGS.find((o) => o.id === user.orgId);

  const myEvents = useMemo(
    () =>
      events
        .filter((e) => e.orgId === currentOrg?.id)
        .sort((a, b) => a.start - b.start),
    [events, currentOrg]
  );

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (payload.id) {
        await editEvent(payload.id, payload);
      } else {
        await addEvent(payload);
      }
      setFormState(null);
    } catch {
      window.alert("Couldn't save the event. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event? This can't be undone.")) return;
    await removeEvent(id);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <Navbar
        page="manage"
        onNavigate={onNavigate}
        onNewEvent={() => setFormState("new")}
      />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-stone-900">Your events</h1>
            <p className="text-sm text-stone-500">{currentOrg?.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setFormState("new")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={15} /> New event
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white border border-stone-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-sm text-red-600">{error}</div>
        ) : myEvents.length === 0 ? (
          <EmptyState view="manage" onClear={() => {}} />
        ) : (
          <div className="flex flex-col gap-3">
            {myEvents.map((ev) => (
              <MyEventRow key={ev.id} event={ev} onEdit={setFormState} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <button
        type="button"
        onClick={() => setFormState("new")}
        className="sm:hidden fixed bottom-5 right-5 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"
        aria-label="New event"
      >
        <Plus size={20} />
      </button>

      {formState && (
        <EventForm
          initial={typeof formState === "object" ? formState : null}
          org={currentOrg}
          onSave={handleSave}
          onCancel={() => setFormState(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
