import React from "react";
import { Bookmark, BookmarkCheck, MapPin, Clock, Pencil, Trash2 } from "lucide-react";
import PosterBlock from "./PosterBlock";
import { fmtRange } from "../../utils/dateFormat";

export default function EventCard({
  event,
  bookmarked,
  onToggleBookmark,
  onOpen,
  canManage,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <button onClick={() => onOpen(event)} className="text-left" aria-label={`Open ${event.title}`}>
        <PosterBlock category={event.category} />
      </button>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <button onClick={() => onOpen(event)} className="text-left">
          <h3 className="font-semibold text-stone-900 leading-snug line-clamp-2">{event.title}</h3>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <Clock size={13} />
          <span>{fmtRange(event.start, event.end)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin size={13} />
          <span className="line-clamp-1">{event.venue}</span>
        </div>

        <div className="text-xs text-stone-400 mt-0.5">{event.organizer}</div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => onToggleBookmark(event.id)}
            className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-indigo-600"
          >
            {bookmarked ? (
              <BookmarkCheck size={16} className="text-indigo-600" />
            ) : (
              <Bookmark size={16} />
            )}
            {bookmarked ? "Saved" : "Save"}
          </button>

          {canManage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(event)}
                className="text-stone-400 hover:text-stone-700"
                aria-label="Edit event"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="text-stone-400 hover:text-red-600"
                aria-label="Delete event"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
