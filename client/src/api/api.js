import axios from "axios";
import { CATS, ORGS } from "../utils/constants";
import { todayPlus } from "../utils/dateFormat";

// Point this at your Express server once it's running.
// CRA reads REACT_APP_* vars from .env at build time.
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: BASE_URL });

// Attach the JWT if we have one, on every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("campushub_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------------------------------------------------------------------------
// MOCK DATA — used until the real backend exists.
// Toggle USE_MOCK to false once your Express/Mongo backend is up and the
// routes below actually exist.
// ---------------------------------------------------------------------------
const USE_MOCK = true;

const SEED_EVENTS = [
  {
    id: "e1",
    title: "Intro to React & Modern Frontend",
    category: "workshop",
    orgId: "org-cs",
    organizer: "Dept. of Computer Science",
    start: todayPlus(2, 14, 0),
    end: todayPlus(2, 17, 0),
    venue: "CS Seminar Hall, Block C",
    description:
      "A hands-on workshop covering React fundamentals, hooks, and building your first component. Laptops required. Open to all years.",
    link: "https://forms.gle/example1",
  },
  {
    id: "e2",
    title: "HackNova 2026 — 24hr Hackathon",
    category: "hackathon",
    orgId: "org-ieee",
    organizer: "IEEE Student Chapter",
    start: todayPlus(5, 9, 0),
    end: todayPlus(6, 9, 0),
    venue: "Innovation Lab, Block A",
    description:
      "Build something in 24 hours. Themes announced at kickoff. Teams of 2-4. Food and WiFi provided. Prizes worth ₹50,000.",
    link: "https://unstop.com/example",
  },
  {
    id: "e3",
    title: "Spring Cultural Fest — Auditions",
    category: "cultural",
    orgId: "org-cult",
    organizer: "Cultural Committee",
    start: todayPlus(3, 16, 0),
    end: todayPlus(3, 19, 0),
    venue: "Main Auditorium",
    description:
      "Auditions for dance, music, and drama for the annual spring fest. All departments welcome. Bring your own props if needed.",
    link: "https://forms.gle/example3",
  },
  {
    id: "e4",
    title: "Inter-Department Football League",
    category: "sports",
    orgId: "org-sports",
    organizer: "Sports Board",
    start: todayPlus(7, 8, 0),
    end: todayPlus(7, 12, 0),
    venue: "Main Football Ground",
    description:
      "Round-robin league between department teams. Register your team of 11 + 3 substitutes. Jerseys not provided.",
    link: "https://forms.gle/example4",
  },
  {
    id: "e5",
    title: "Photography Club — Core Team Recruitment",
    category: "committee",
    orgId: "org-cult",
    organizer: "Photography Club",
    start: todayPlus(1, 11, 0),
    end: todayPlus(4, 18, 0),
    venue: "Apply online",
    description:
      "Looking for editors, event photographers, and social media leads. Portfolio not mandatory, enthusiasm is.",
    link: "https://forms.gle/example5",
  },
  {
    id: "e6",
    title: "Guest Lecture: Careers in Applied ML",
    category: "lecture",
    orgId: "org-cs",
    organizer: "Dept. of Computer Science",
    start: todayPlus(4, 15, 0),
    end: todayPlus(4, 16, 30),
    venue: "Online via Zoom",
    description:
      "A senior ML engineer from industry talks about breaking into applied ML roles, interview prep, and common mistakes.",
    link: "https://zoom.us/example6",
  },
  {
    id: "e7",
    title: "CodeSprint — Competitive Programming",
    category: "competition",
    orgId: "org-ieee",
    organizer: "IEEE Student Chapter",
    start: todayPlus(9, 10, 0),
    end: todayPlus(9, 13, 0),
    venue: "Computer Lab 2",
    description:
      "Individual competitive programming contest, Codeforces style. Top 3 win cash prizes. Open to all branches.",
    link: "https://unstop.com/example7",
  },
];

// in-memory store so create/edit/delete persist for the session
let mockEvents = SEED_EVENTS.map((e) => ({ ...e, status: "published" }));

function delay(ms = 250) {
  return new Promise((res) => setTimeout(res, ms));
}

// ---------------------------------------------------------------------------
// Public API — components only ever call these functions, never axios
// directly. Swapping USE_MOCK to false routes everything through `client`
// without touching a single component.
// ---------------------------------------------------------------------------

export async function fetchEvents() {
  if (USE_MOCK) {
    await delay();
    return mockEvents.filter((e) => e.status === "published");
  }
  const { data } = await client.get("/events");
  return data.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
}

export async function createEvent(payload) {
  if (USE_MOCK) {
    await delay();
    const newEvent = { ...payload, id: `e${Date.now()}`, status: "published" };
    mockEvents = [newEvent, ...mockEvents];
    return newEvent;
  }
  const { data } = await client.post("/events", payload);
  return data;
}

export async function updateEvent(id, payload) {
  if (USE_MOCK) {
    await delay();
    mockEvents = mockEvents.map((e) => (e.id === id ? { ...e, ...payload } : e));
    return mockEvents.find((e) => e.id === id);
  }
  const { data } = await client.put(`/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id) {
  if (USE_MOCK) {
    await delay();
    mockEvents = mockEvents.filter((e) => e.id !== id);
    return { id };
  }
  await client.delete(`/events/${id}`);
  return { id };
}

export async function loginUser({ name, role, orgId }) {
  if (USE_MOCK) {
    await delay(150);
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem("campushub_token", token);
    return { name, role, orgId: role === "organizer" ? orgId : null, token };
  }
  const { data } = await client.post("/auth/login", { name, role, orgId });
  localStorage.setItem("campushub_token", data.token);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("campushub_token");
}

export { CATS, ORGS };
export default client;
