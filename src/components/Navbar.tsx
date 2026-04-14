import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-amber-400 font-bold text-xl">
          <CalendarDays size={24} />
          <span>Celestial Calendar</span>
        </Link>
        <Link
          to="/app"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Open Calendar
        </Link>
      </div>
    </nav>
  );
}
