export default function EventCard({ event, onClick }) {
  return (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100" onClick={onClick}>
      <div className="relative h-48">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md uppercase">{event.category}</span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <p className="text-sm text-outline">{event.date}</p>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <span className="text-xs text-outline">{event.organizer}</span>
          <span className="text-primary font-bold text-sm">{event.price}</span>
        </div>
      </div>
    </div>
  );
}