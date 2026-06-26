import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import EmptyState from "../components/layout/EmptyState";
import FilterBar from "../components/filters/FilterBar";
import EventCard from "../components/events/EventCard";
import EventModal from "../components/events/EventModal";
import CalendarView from "../components/calendar/CalendarView";

// Student-facing page: browse, search, filter, save, and view events.
// Event creation/editing lives in OrganizerDashboard.jsx, not here.
// eventsApi/bookmarksApi are created once in App.js and shared with
// OrganizerDashboard, so changes made there show up here immediately.
export default function Dashboard({ onNavigate, eventsApi, bookmarksApi }) {
  const { filteredEvents, loading, error, query, setQuery, activeCat, setActiveCat } = eventsApi;
  const { bookmarks, toggleBookmark, isBookmarked } = bookmarksApi;

  const [view, setView] = useState("grid"); // grid | calendar | saved
  const [openEvent, setOpenEvent] = useState(null);

  const savedEvents = filteredEvents.filter((e) => bookmarks.has(e.id));
  const displayList = view === "saved" ? savedEvents : filteredEvents;

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <Navbar page="dashboard" view={view} onViewChange={setView} onNavigate={onNavigate} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {view !== "calendar" && (
          <div className="mb-4">
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              activeCat={activeCat}
              onCatChange={setActiveCat}
            />
          </div>
        )}

        {loading ? (
          <LoadingGrid />
        ) : error ? (
          <div className="text-center py-20 text-sm text-red-600">{error}</div>
        ) : view === "calendar" ? (
          <CalendarView events={filteredEvents} onOpen={setOpenEvent} />
        ) : displayList.length === 0 ? (
          <EmptyState
            view={view}
            onClear={() => {
              setQuery("");
              setActiveCat(null);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayList.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                bookmarked={isBookmarked(ev.id)}
                onToggleBookmark={toggleBookmark}
                onOpen={setOpenEvent}
                canManage={false}
              />
            ))}
          </div>
        )}
      </main>

      {openEvent && (
        <EventModal
          event={openEvent}
          onClose={() => setOpenEvent(null)}
          bookmarked={isBookmarked(openEvent.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-stone-200 rounded-xl overflow-hidden animate-pulse">
          <div className="h-32 bg-stone-100" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-4 bg-stone-100 rounded w-3/4" />
            <div className="h-3 bg-stone-100 rounded w-1/2" />
            <div className="h-3 bg-stone-100 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
