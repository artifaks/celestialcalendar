import { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

const tzolkinDays = [
  { name: 'Imix', emoji: '🐊', meaning: 'Crocodile / Water Lily' },
  { name: 'Ik', emoji: '💨', meaning: 'Wind / Spirit' },
  { name: 'Akbal', emoji: '🌙', meaning: 'Night / House' },
  { name: 'Kan', emoji: '🌱', meaning: 'Seed / Net' },
  { name: 'Chicchan', emoji: '🐍', meaning: 'Serpent / Feathered' },
  { name: 'Cimi', emoji: '💀', meaning: 'Death / Transformation' },
  { name: 'Manik', emoji: '🦌', meaning: 'Deer / Hand' },
  { name: 'Lamat', emoji: '⭐', meaning: 'Star / Rabbit' },
  { name: 'Muluc', emoji: '💧', meaning: 'Water / Offering' },
  { name: 'Oc', emoji: '🐕', meaning: 'Dog / Companion' },
  { name: 'Chuen', emoji: '🐒', meaning: 'Monkey / Artisan' },
  { name: 'Eb', emoji: '🌿', meaning: 'Grass / Road' },
  { name: 'Ben', emoji: '🌽', meaning: 'Reed / Corn' },
  { name: 'Ix', emoji: '🐆', meaning: 'Jaguar / Shaman' },
  { name: 'Men', emoji: '🦅', meaning: 'Eagle / Wise One' },
  { name: 'Cib', emoji: '🦉', meaning: 'Owl / Vulture' },
  { name: 'Caban', emoji: '🌍', meaning: 'Earth / Movement' },
  { name: 'Etznab', emoji: '🔪', meaning: 'Flint / Mirror' },
  { name: 'Cauac', emoji: '⛈️', meaning: 'Storm / Turtle' },
  { name: 'Ahau', emoji: '☀️', meaning: 'Sun / Lord' },
];

const haabMonths = [
  { name: 'Pop', emoji: '🏺', meaning: 'Mat / Beginning' },
  { name: 'Wo', emoji: '🌑', meaning: 'Black / Frog' },
  { name: 'Sip', emoji: '🦌', meaning: 'Red Deer' },
  { name: 'Sotz', emoji: '🦇', meaning: 'Bat / Fish' },
  { name: 'Sec', emoji: '💀', meaning: 'Sky / Earth' },
  { name: 'Xul', emoji: '🐕', meaning: 'Dog / End' },
  { name: 'Yaxkin', emoji: '☀️', meaning: 'New Sun' },
  { name: 'Mol', emoji: '💧', meaning: 'Water / Gathering' },
  { name: 'Chen', emoji: '🌙', meaning: 'Black Storm / Cave' },
  { name: 'Yax', emoji: '🌿', meaning: 'Green / New' },
  { name: 'Sac', emoji: '⬜', meaning: 'White / Frog' },
  { name: 'Ceh', emoji: '🦌', meaning: 'Red / Deer' },
  { name: 'Mac', emoji: '🐢', meaning: 'Enclosed / Turtle' },
  { name: 'Kankin', emoji: '🌞', meaning: 'Yellow Sun' },
  { name: 'Muan', emoji: '🦉', meaning: 'Cloudy / Owl' },
  { name: 'Pax', emoji: '🥁', meaning: 'Planting / Storm' },
  { name: 'Kayab', emoji: '🐢', meaning: 'Turtle / Celestial' },
  { name: 'Cumku', emoji: '🌙', meaning: 'Dark / Granary' },
  { name: 'Uayeb', emoji: '⚠️', meaning: 'Unnamed / Unlucky Days' },
];

function getGregorianCorrelation(year: number, month: number, day: number) {
  // Julian Day Number
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // GMT correlation constant
  const gmt = 584283;
  const mayanDay = jdn - gmt;
  
  // Tzolkin
  const tzolkinNumber = ((mayanDay % 13) + 13) % 13 + 1;
  const tzolkinDay = ((mayanDay % 20) + 20) % 20;
  
  // Haab
  const haabDay = ((mayanDay + 348) % 365);
  const haabMonth = Math.floor(haabDay / 20);
  const haabDayNum = haabDay % 20;
  
  // Long Count
  const kin = ((mayanDay % 20) + 20) % 20;
  const uinal = Math.floor(((mayanDay % 360) + 360) % 360 / 20);
  const tun = Math.floor(((mayanDay % 7200) + 7200) % 7200 / 360);
  const katun = Math.floor(((mayanDay % 144000) + 144000) % 144000 / 7200);
  const baktun = Math.floor((mayanDay % 1872000) / 144000) + 13;
  
  return {
    tzolkinNumber,
    tzolkinDay: tzolkinDays[tzolkinDay],
    haabMonth: haabMonths[haabMonth] || haabMonths[0],
    haabDay: haabDayNum,
    longCount: `${baktun}.${katun}.${tun}.${uinal}.${kin}`,
  };
}

export default function MayanCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  
  const date = new Date(selectedDate + 'T12:00:00');
  const mayan = getGregorianCorrelation(date.getFullYear(), date.getMonth() + 1, date.getDate());

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-800/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-white text-2xl font-bold">
            🏛️ Mayan Calendar System
          </h2>
          <Info size={20} className="text-white/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date Selection */}
          <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-4">
            <h3 className="flex items-center gap-2 text-emerald-400 font-semibold mb-4">
              <Calendar size={18} /> Date Selection
            </h3>
            <div className="mb-3">
              <label className="text-emerald-400/70 text-sm mb-1 block">Gregorian Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-emerald-950/40 border border-emerald-700/30 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div className="bg-emerald-950/40 border border-emerald-700/30 rounded-lg p-3">
              <div className="text-emerald-400/70 text-sm mb-1">Long Count</div>
              <div className="text-white font-mono text-2xl font-bold">{mayan.longCount}</div>
            </div>
          </div>

          {/* Tzolkin & Haab */}
          <div className="space-y-4">
            <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-4">
              <div className="text-emerald-400 font-semibold mb-2">Tzolkin Date</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mayan.tzolkinDay.emoji}</span>
                <div>
                  <div className="text-white text-xl font-bold">{mayan.tzolkinNumber} {mayan.tzolkinDay.name}</div>
                  <div className="text-white/50 text-sm">{mayan.tzolkinDay.meaning}</div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-4">
              <div className="text-emerald-400 font-semibold mb-2">Haab Date</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mayan.haabMonth.emoji}</span>
                <div>
                  <div className="text-white text-xl font-bold">{mayan.haabDay} {mayan.haabMonth.name}</div>
                  <div className="text-white/50 text-sm">{mayan.haabMonth.meaning}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tzolkin Day Names Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white/80 font-semibold mb-3">Tzolkin Day Names</h3>
            <div className="grid grid-cols-4 gap-2">
              {tzolkinDays.map((day) => (
                <div
                  key={day.name}
                  className={"flex flex-col items-center p-2 rounded-lg text-center border " + (day.name === mayan.tzolkinDay.name ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/10')}
                >
                  <span className="text-xl mb-1">{day.emoji}</span>
                  <span className={"text-xs " + (day.name === mayan.tzolkinDay.name ? 'text-emerald-400 font-bold' : 'text-white/60')}>{day.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white/80 font-semibold mb-3">Haab Months</h3>
            <div className="grid grid-cols-4 gap-2">
              {haabMonths.map((month) => (
                <div
                  key={month.name}
                  className={"flex flex-col items-center p-2 rounded-lg text-center border " + (month.name === mayan.haabMonth.name ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/10')}
                >
                  <span className="text-xl mb-1">{month.emoji}</span>
                  <span className={"text-xs " + (month.name === mayan.haabMonth.name ? 'text-emerald-400 font-bold' : 'text-white/60')}>{month.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
