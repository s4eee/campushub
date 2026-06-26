import React from "react";
import { catInfo } from "../../utils/constants";

export default function CategoryTag({ id }) {
  const c = catInfo(id);
  return (
    <span
      style={{ background: c.bg, color: c.color }}
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
    >
      {c.label}
    </span>
  );
}
