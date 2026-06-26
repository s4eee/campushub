import React from "react";
import { LayoutGrid, Calendar, Bookmark, Plus, LogOut, Settings2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// page: "dashboard" | "manage"  — which top-level page we're on
// view: "grid" | "calendar" | "saved" — only relevant when page === "dashboard"
export default function Navbar({ page, view, onViewChange, onNavigate, onNewEvent }) {
  const { user, logout } = useAuth();
  const isOrganizer = user?.role === "organizer";
  const currentOrgName = isOrganizer ? user.orgName : null;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <button type="button" onClick={() => onNavigate("dashboard")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="font-bold text-stone-900 hidden sm:block">CampusHub</span>
        </button>

        <div className="flex-1" />

        {page === "dashboard" && (
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-md ${view === "grid" ? "bg-indigo-600 text-white" : "text-stone-500 hover:bg-stone-100"}`}
              title="Grid view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("calendar")}
              className={`p-1.5 rounded-md ${view === "calendar" ? "bg-indigo-600 text-white" : "text-stone-500 hover:bg-stone-100"}`}
              title="Calendar view"
            >
              <Calendar size={15} />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("saved")}
              className={`p-1.5 rounded-md ${view === "saved" ? "bg-indigo-600 text-white" : "text-stone-500 hover:bg-stone-100"}`}
              title="Saved events"
            >
              <Bookmark size={15} />
            </button>
          </div>
        )}

        {isOrganizer && page === "dashboard" && (
          <button
            type="button"
            onClick={() => onNavigate("manage")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-50"
          >
            <Settings2 size={15} /> Manage events
          </button>
        )}

        {isOrganizer && page === "manage" && onNewEvent && (
          <button
            type="button"
            onClick={onNewEvent}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={15} /> New event
          </button>
        )}

        <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-xs font-medium text-stone-700">{user?.name}</span>
            <span className="text-[11px] text-stone-400">{currentOrgName || "Student"}</span>
          </div>
          <button type="button" onClick={logout} title="Log out" className="text-stone-400 hover:text-stone-700 p-1.5">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
