// Single source of truth for event categories.
// Every component that needs a category color/label imports from here —
// never hardcode category colors inline.
export const CATS = [
  { id: "workshop", label: "Workshops", color: "#2D5FB3", bg: "#E7EEFA" },
  { id: "hackathon", label: "Hackathons", color: "#6B3FB8", bg: "#EFE7FA" },
  { id: "technical", label: "Technical events", color: "#0E7C7B", bg: "#E2F4F3" },
  { id: "cultural", label: "Cultural events", color: "#C2410C", bg: "#FCE9DD" },
  { id: "sports", label: "Sports events", color: "#15803D", bg: "#E4F3E8" },
  { id: "committee", label: "Committee recruitments", color: "#A8324A", bg: "#FBE6EB" },
  { id: "lecture", label: "Guest lectures", color: "#9A6B0C", bg: "#FBF0DC" },
  { id: "competition", label: "Competitions", color: "#3B4252", bg: "#E9EAED" },
];

export const catInfo = (id) => CATS.find((c) => c.id === id) || CATS[0];

// Seed organizations. Later this comes from the backend /organizations endpoint.
export const ORGS = [
  { id: "org-ieee", name: "IEEE Student Chapter", verified: true },
  { id: "org-cult", name: "Cultural Committee", verified: true },
  { id: "org-sports", name: "Sports Board", verified: true },
  { id: "org-cs", name: "Dept. of Computer Science", verified: true },
];
