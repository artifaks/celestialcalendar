import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const egyptianMonths = [
  { name: 'Thoth', symbol: '🐍', period: 'Aug/Sep', deity: 'Thoth', description: 'Sacred to Thoth', note: 'Opening of the Year' },
  { name: 'Phaophi', symbol: '🦅', period: 'Sep/Oct', deity: 'Horus', description: 'Sacred to Horus', note: 'Harvest Season' },
  { name: 'Hathor', symbol: '🐄', period: 'Oct/Nov', deity: 'Hathor', description: 'Sacred to Hathor', note: 'Festival of Hathor' },
  { name: 'Choiak', symbol: '🌾', period: 'Nov/Dec', deity: 'Osiris', description: 'Sacred to Osiris', note: 'Mysteries of Osiris' },
  { name: 'Tybi', symbol: '⚡', period: 'Dec/Jan', deity: 'Sekhmet', description: 'Sacred to Sekhmet', note: 'Festival of Sekhmet' },
  { name: 'Mechir', symbol: '💨', period: 'Jan/Feb', deity: 'Shu', description: 'Sacred to Shu', note: 'Festival of Winds' },
  { name: 'Phamenoth', symbol: '🌱', period: 'Feb/Mar', deity: 'Amon-Ra', description: 'Sacred to Amon-Ra', note: 'Festival of Amon' },
  { name: 'Pharmuthi', symbol: '🐝', period: 'Mar/Apr', deity: 'Renenutet', description: 'Sacred to Renenutet', note: 'Festival of Harvest' },
  { name: 'Pachon', symbol: '🦁', period: 'Apr/May', deity: 'Khonsu', description: 'Sacred to Khonsu', note: 'Festival of the Moon' },
  { name: 'Payni', symbol: '☀️', period: 'May/Jun', deity: 'Min', description: 'Sacred to Min', note: 'Festival of Min' },
  { name: 'Epiphi', symbol: '🌊', period: 'Jun/Jul', deity: 'Ra', description: 'Sacred to Ra', note: 'Rise of Sirius' },
  { name: 'Mesore', symbol: '🌊', period: 'Jul/Aug', deity: 'Nile', description: 'Sacred to Nile', note: 'Nile Inundation' },
];

const seasons = [
  { name: 'Akhet', description: 'Inundation', months: [0, 1, 2, 3] },
  { name: 'Peret', description: 'Growth', months: [4, 5, 6, 7] },
  { name: 'Shemu', description: 'Harvest', months: [8, 9, 10, 11] },
];

const sacredFestivals = [
  { name: 'Wepet Renpet', days: '1-1', description: 'New Year Festival', deity: 'Osiris' },
  { name: 'Opet Festival', days: '2-15', description: 'Feast of Luxor', deity: 'Amun' },
  { name: 'Feast of Hathor', days: '3-1', description: 'Celebration of Joy', deity: 'Hathor' },
  { name: 'Mysteries of Osiris', days: '4-12', description: 'Death and Rebirth', deity: 'Osiris' },
  { name: 'Festival of Sokar', days: '4-26', description: 'Funerary Rites', deity: 'Sokar' },
  { name: 'Beautiful Feast', days: '9-1', description: 'Valley Festival', deity: 'Amun' },
];

function getLunarDay(date: Date): number {
  const knownNewMoon = new Date('2000-01-06');
  const daysSince = Math.floor((date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24));
  return ((daysSince % 30) + 1);
}

function getCurrentEgyptianDate(date: Date) {
  const month = date.getMonth();
  const day = date.getDate();
  
  const monthIndex = month < 8 ? month + 4 : month - 8;
  const egyptianMonth = egyptianMonths[monthIndex % 12];
  const season = seasons.find(s => s.months.includes(monthIndex % 12));
  
  return {
    month: egyptianMonth,
    season,
    day: day,
    gregorian: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

export default function EgyptianCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(() => {
    const m = today.getMonth();
    return m < 8 ? m + 4 : m - 8;
  });
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  const lunarDay = getLunarDay(currentDate);
  const egyptianDate = getCurrentEgyptianDate(currentDate);
  const currentMonth = egyptianMonths[selectedMonthIdx % 12];

  const prevMonth = () => {
    setSelectedMonthIdx((prev) => (prev - 1 + 12) % 12);
  };
  const nextMonth = () => {
    setSelectedMonthIdx((prev) => (prev + 1) % 12);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonthIdx(parseInt(e.target.value));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(parseInt(e.target.value));
    // Update gregorian date display
    const year = today.getFullYear();
    const monthOffset = selectedMonthIdx < 4 ? selectedMonthIdx + 8 : selectedMonthIdx - 4;
    const newDate = new Date(year, monthOffset, parseInt(e.target.value));
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-amber-950/20 border border-amber-800/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-amber-400 text-2xl font-bold">
          <Calendar size={24} /> Egyptian Calendar
        </h2>
        <div className="flex items-center gap-2 text-amber-400">
          <span className="text-2xl">🌕</span>
          <span className="text-sm">Lunar Day {lunarDay}</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-amber-950/30 rounded-xl p-4 mb-6">
        <h3 className="flex items-center gap-2 text-amber-400 font-semibold mb-4">
          <Calendar size={18} /> Egyptian Date Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-amber-400/70 text-sm mb-1 block">Season</label>
            <div className="bg-amber-950/40 border border-amber-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{egyptianDate.season?.name === 'Akhet' ? '🌊' : egyptianDate.season?.name === 'Peret' ? '🌱' : '☀️'}</span>
                <div>
                  <div className="text-white font-semibold">{egyptianDate.season?.name || 'Peret'}</div>
                  <div className="text-amber-400/60 text-xs">{egyptianDate.season?.description || 'Growth'}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="text-amber-400/70 text-sm mb-1 block">Month</label>
            <select
              value={selectedMonthIdx}
              onChange={handleMonthChange}
              className="w-full bg-amber-950/40 border border-amber-700/30 rounded-lg p-3 text-white focus:outline-none focus:border-amber-400"
            >
              {egyptianMonths.map((m, i) => (
                <option key={m.name} value={i} className="bg-slate-900">
                  {m.symbol} {m.name} ({m.period})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-amber-400/70 text-sm mb-1 block">Day</label>
            <select
              value={selectedDay}
              onChange={handleDayChange}
              className="w-full bg-amber-950/40 border border-amber-700/30 rounded-lg p-3 text-white focus:outline-none focus:border-amber-400"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d} className="bg-slate-900">Day {d}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-amber-950/40 border border-amber-700/30 rounded-lg p-3">
          <div className="text-amber-400/70 text-sm">Gregorian Date:</div>
          <div className="text-amber-400 font-semibold">{egyptianDate.gregorian}</div>
        </div>
      </div>

      {/* Month Detail & Festivals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-950/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{currentMonth.symbol}</span>
            <div>
              <h3 className="text-amber-400 font-semibold text-lg">{currentMonth.name}</h3>
              <span className="text-amber-400/60 text-sm">({currentMonth.period})</span>
            </div>
          </div>
          <p className="text-white/70 text-sm mb-1">{currentMonth.description}</p>
          <p className="text-amber-400/80 text-sm italic">{currentMonth.note}</p>
          
          <div className="flex gap-2 mt-4">
            <button onClick={prevMonth} className="flex items-center gap-1 bg-amber-800/30 hover:bg-amber-800/50 text-amber-400 px-3 py-1.5 rounded-lg text-sm transition-colors">
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={nextMonth} className="flex items-center gap-1 bg-amber-800/30 hover:bg-amber-800/50 text-amber-400 px-3 py-1.5 rounded-lg text-sm transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="bg-amber-950/30 rounded-xl p-4">
          <h3 className="text-amber-400 font-semibold mb-3">Sacred Festivals</h3>
          <div className="space-y-3">
            {sacredFestivals.map((festival) => (
              <div key={festival.name} className="flex items-start justify-between border-b border-amber-700/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{festival.deity === 'Osiris' ? '🐍' : festival.deity === 'Amun' ? '🐝' : festival.deity === 'Hathor' ? '🐄' : '⭐'}</span>
                  <div>
                    <div className="text-amber-400 font-medium text-sm">{festival.name}</div>
                    <div className="text-white/60 text-xs">{festival.description} • Sacred to {festival.deity}</div>
                  </div>
                </div>
                <span className="text-white/40 text-xs">{festival.days}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
