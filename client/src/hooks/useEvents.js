import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../api/api";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError("Couldn't load events. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredEvents = useMemo(() => {
    let list = events;
    if (activeCat) list = list.filter((e) => e.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }
    return list.slice().sort((a, b) => a.start - b.start);
  }, [events, activeCat, query]);

  const addEvent = async (payload) => {
    const created = await createEvent(payload);
    setEvents((prev) => [created, ...prev]);
    return created;
  };

  const editEvent = async (id, payload) => {
    const updated = await updateEvent(id, payload);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    events,
    filteredEvents,
    loading,
    error,
    query,
    setQuery,
    activeCat,
    setActiveCat,
    addEvent,
    editEvent,
    removeEvent,
    reload: load,
  };
}
