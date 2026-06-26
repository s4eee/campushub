import React from "react";
import { X, MapPin, Clock, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import PosterBlock from "./PosterBlock";
import CategoryTag from "./CategoryTag";
import { catInfo } from "../../utils/constants";
import { fmtRange } from "../../utils/dateFormat";

export default function EventModal({ event, onClose, bookmarked, onToggleBookmark }) {
  if (!event) return null;
  const c = catInfo(event.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(20,18,14,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <PosterBlock category={event.category} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <CategoryTag id={event.category} />
            <h2 className="text-xl font-bold text-stone-900 mt-2 leading-snug">{event.title}</h2>
            <div className="text-sm text-stone-500 mt-1">by {event.organizer}</div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-stone-700">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-stone-400" />
              {fmtRange(event.start, event.end)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-stone-400" />
              {event.venue}
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">{event.description}</p>

          <div className="flex items-center gap-3 pt-2">
            {/* This is the one legitimate <a href> in the app — a real external URL. */}
            <a
              href={event.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white"
              style={{ background: c.color }}
            >
              Register <ExternalLink size={15} />
            </a>
            <button
              onClick={() => onToggleBookmark(event.id)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium border border-stone-200 text-stone-700 hover:bg-stone-50"
            >
              {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {bookmarked ? "Saved" : "Save"}
            </button>
          </div>

          <p className="text-xs text-stone-400">
            Registration happens on the organizer's external platform. CampusHub does not collect
            registration data.
          </p>
        </div>
      </div>
    </div>
  );
}
