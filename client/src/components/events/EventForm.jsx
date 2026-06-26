import React, { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Field from "../shared/Field";
import { CATS } from "../../utils/constants";
import { todayPlus } from "../../utils/dateFormat";

// Converts a Date to the "yyyy-MM-ddThh:mm" string <input type="datetime-local"> needs.
function toLocalInputValue(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function EventForm({ initial, org, onSave, onCancel, saving }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || CATS[0].id);
  const [venue, setVenue] = useState(initial?.venue || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [link, setLink] = useState(initial?.link || "");
  const [startDate, setStartDate] = useState(
    initial ? toLocalInputValue(initial.start) : toLocalInputValue(todayPlus(1, 12, 0))
  );
  const [endDate, setEndDate] = useState(
    initial ? toLocalInputValue(initial.end) : toLocalInputValue(todayPlus(1, 15, 0))
  );
  const [error, setError] = useState("");

  const submit = () => {
    if (!title.trim()) return setError("Add a title for the event.");
    if (!venue.trim()) return setError("Add a venue, even if it's online.");
    if (!link.trim()) return setError("Add a registration link so students can sign up.");

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return setError("End time can't be before the start time.");

    setError("");
    onSave({
      ...(initial || {}),
      id: initial?.id,
      title: title.trim(),
      category,
      venue: venue.trim(),
      description: description.trim(),
      link: link.trim(),
      start,
      end,
      organizer: org.name,
      orgId: org.id,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(20,18,14,0.5)" }}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">
              {initial ? "Edit event" : "Create event"}
            </h2>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <Field label="Event title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Intro to React Workshop"
              className="input"
            />
          </Field>

          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
              {CATS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Starts">
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Ends">
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Venue">
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Seminar Hall, Block C or Online"
              className="input"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What should students know before they register?"
              className="input resize-none"
            />
          </Field>

          <Field label="Registration link">
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Google Form, Unstop, Devfolio, or your website"
              className="input"
            />
          </Field>

          <Field label="Poster">
            <div className="flex items-center gap-2 text-sm text-stone-400 border border-dashed border-stone-300 rounded-lg p-3">
              <ImageIcon size={16} />
              Poster upload isn't wired up yet — a colored category card is shown instead.
            </div>
          </Field>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={submit}
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : initial ? "Save changes" : "Publish event"}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg font-medium border border-stone-200 text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
