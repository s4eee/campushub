import React from "react";
import { catInfo } from "../../utils/constants";

export default function PosterBlock({ category }) {
  const c = catInfo(category);
  return (
    <div
      className="h-32 w-full rounded-t-xl relative overflow-hidden flex items-end p-3"
      style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.color}22)` }}
    >
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-30"
        style={{ background: c.color }}
      />
      <div
        className="absolute left-3 top-3 px-2 py-1 rounded-md text-[11px] font-semibold"
        style={{ background: c.color, color: "#fff" }}
      >
        {c.label}
      </div>
    </div>
  );
}
