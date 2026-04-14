import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface CelestialProfile {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  sunDescription: string;
  moonDescription: string;
  element: string;
  quality: string;
}

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', description: 'Bold and ambitious, Aries dives headfirst into challenges.' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', description: 'Patient and reliable, Taurus is devoted and productive.' },
  { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', description: 'Gentle and affectionate, Gemini is curious and adaptable.' },
  { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', description: 'Tenacious and highly imaginative, Cancer is loyal and emotional.' },
  { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', description: 'Creative and passionate, Leo is warm-hearted and cheerful.' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', description: 'Loyal and analytical, Virgo is kind and hardworking.' },
  { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', description: 'Cooperative and diplomatic, Libra is gracious and fair-minded.' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', description: 'Resourceful and brave, Scorpio is passionate and determined.' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', description: 'Generous and idealistic, Sagittarius has a great sense of humor.' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', description: 'Responsible and disciplined, Capricorn is self-controlled.' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', description: 'Progressive and original, Aquarius is humanitarian and independent.' },
  { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', description: 'Compassionate and artistic, Pisces is wise and gentle.' },
];

function getSunSign(date: Date): typeof zodiacSigns[0] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
}

export default function AstrologyCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [profile, setProfile] = useState<CelestialProfile | null>(null);

  const calculateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const date = new Date(birthDate + 'T12:00:00');
    const sunSign = getSunSign(date);
    
    // Moon sign approximation based on birth date offset
    const moonOffset = Math.floor(date.getTime() / (1000 * 60 * 60 * 24 * 2.5)) % 12;
    const moonSign = zodiacSigns[moonOffset];
    
    // Rising sign based on birth time
    const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;
    const risingOffset = Math.floor(hour / 2) % 12;
    const risingSign = zodiacSigns[risingOffset];

    setProfile({
      sunSign: sunSign.name,
      moonSign: moonSign.name,
      risingSign: risingSign.name,
      sunDescription: sunSign.description,
      moonDescription: moonSign.description,
      element: sunSign.element,
      quality: sunSign.quality,
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <form onSubmit={calculateProfile}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-amber-400 mb-2 text-sm font-medium">
              <Calendar size={16} /> Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-amber-400 mb-2 text-sm font-medium">
              <Clock size={16} /> Birth Time
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-amber-400 mb-2 text-sm font-medium">
              <MapPin size={16} /> Birth Location
            </label>
            <input
              type="text"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Calculate Celestial Profile
        </button>
      </form>

      {profile && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{zodiacSigns.find(z => z.name === profile.sunSign)?.symbol}</div>
            <div className="text-amber-400 font-semibold">Sun Sign</div>
            <div className="text-white text-xl font-bold">{profile.sunSign}</div>
            <div className="text-white/60 text-sm mt-1">{profile.element} · {profile.quality}</div>
            <p className="text-white/70 text-xs mt-2">{profile.sunDescription}</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{zodiacSigns.find(z => z.name === profile.moonSign)?.symbol}</div>
            <div className="text-blue-400 font-semibold">Moon Sign</div>
            <div className="text-white text-xl font-bold">{profile.moonSign}</div>
            <p className="text-white/70 text-xs mt-2">{profile.moonDescription}</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{zodiacSigns.find(z => z.name === profile.risingSign)?.symbol}</div>
            <div className="text-purple-400 font-semibold">Rising Sign</div>
            <div className="text-white text-xl font-bold">{profile.risingSign}</div>
            <p className="text-white/70 text-xs mt-2">
              {zodiacSigns.find(z => z.name === profile.risingSign)?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
