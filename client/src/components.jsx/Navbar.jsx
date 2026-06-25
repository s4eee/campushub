export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-black/5">
      <nav className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
        <a className="font-display text-2xl font-extrabold text-primary" href="#">CampusHub</a>
        <div className="hidden md:flex gap-6">
          <a className="text-primary border-b-2 border-primary pb-1" href="#">Events</a>
          <a className="text-on-surface-variant" href="#">Calendar</a>
        </div>
      </nav>
    </header>
  );
}