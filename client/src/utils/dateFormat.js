export function fmtDate(d) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function fmtTime(d) {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

// "Jun 26 · 2:00 PM–5:00 PM" for same-day events,
// "Jun 26 – Jun 27" for multi-day events.
export function fmtRange(start, end) {
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) return `${fmtDate(start)} · ${fmtTime(start)}–${fmtTime(end)}`;
  return `${fmtDate(start)} – ${fmtDate(end)}`;
}

// Helper used by seed data / forms to build a date N days from today at H:M.
export function todayPlus(days, hours = 10, minutes = 0) {
  const dt = new Date();
  dt.setDate(dt.getDate() + days);
  dt.setHours(hours, minutes, 0, 0);
  return dt;
}
