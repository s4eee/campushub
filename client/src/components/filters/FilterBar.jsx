import React from "react";
import { Search } from "lucide-react";
import { CATS } from "../../utils/constants";

export default function FilterBar({ query, onQueryChange, activeCat, onCatChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search events, clubs, venues..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-200 bg-white text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button
          type="button"
          onClick={() => onCatChange(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
            !activeCat
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-200 text-stone-600 bg-white"
          }`}
        >
          All events
        </button>
        {CATS.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => onCatChange(activeCat === c.id ? null : c.id)}
            style={activeCat === c.id ? { background: c.color, borderColor: c.color, color: "#fff" } : {}}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
              activeCat === c.id ? "" : "border-stone-200 text-stone-600 bg-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
