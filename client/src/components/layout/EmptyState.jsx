import React from "react";
import { Search } from "lucide-react";

const COPY = {
  grid: { title: "No events match that search", body: "Try a different keyword or clear your filters." },
  saved: { title: "Nothing saved yet", body: "Bookmark events from the grid to find them here later." },
  manage: { title: "No events published yet", body: "Create your first event to see it listed here." },
};

export default function EmptyState({ view, onClear }) {
  const copy = COPY[view] || { title: "Nothing here yet", body: "" };
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
        <Search size={20} />
      </div>
      <h3 className="font-semibold text-stone-800">{copy.title}</h3>
      <p className="text-sm text-stone-500 max-w-xs">{copy.body}</p>
      {view === "grid" && (
        <button type="button" onClick={onClear} className="text-sm font-medium text-indigo-600 hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
