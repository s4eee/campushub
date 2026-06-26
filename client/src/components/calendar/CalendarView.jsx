import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { catInfo } from "../../utils/constants";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarView({ events, onOpen }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      const key = ev.start.toDateString();
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-stone-900">
          {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="p-1.5 rounded-md hover:bg-stone-100"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="p-1.5 rounded-md hover:bg-stone-100"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-stone-400 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const dateObj = new Date(year, month, d);
          const key = dateObj.toDateString();
          const dayEvents = eventsByDay[key] || [];
          const isToday = key === new Date().toDateString();
          return (
            <div
              key={i}
              className={`min-h-[64px] rounded-lg p-1.5 border ${
                isToday ? "border-indigo-400 bg-indigo-50" : "border-stone-100"
              }`}
            >
              <div className={`text-xs mb-1 ${isToday ? "font-bold text-indigo-600" : "text-stone-400"}`}>
                {d}
              </div>
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0, 2).map((ev) => (
                  <button
                    type="button"
                    key={ev.id}
                    onClick={() => onOpen(ev)}
                    title={ev.title}
                    style={{ background: catInfo(ev.category).bg, color: catInfo(ev.category).color }}
                    className="text-[10px] leading-tight rounded px-1 py-0.5 text-left truncate"
                  >
                    {ev.title}
                  </button>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-stone-400">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
