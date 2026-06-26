import React from "react";

export default function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-stone-500">{label}</span>
      {children}
    </label>
  );
}
