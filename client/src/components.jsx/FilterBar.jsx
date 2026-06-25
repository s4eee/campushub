import React, { useState } from 'react';

const categories = [
  "All events", "Workshops", "Hackathons", "Technical", 
  "Cultural", "Sports", "Recruitments", "Lectures"
];

export default function FilterBar({ onFilterChange }) {
  const [active, setActive] = useState("All events");

  const handleClick = (category) => {
    setActive(category);
    onFilterChange(category); // Tells the parent (App.js) which category was clicked
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-label-md font-semibold transition-all ${
              active === cat 
                ? "bg-primary text-white shadow-md" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}