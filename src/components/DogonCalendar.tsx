import { Star, Moon, Sun, Info } from 'lucide-react';

interface LunarPhase {
  name: string;
  emoji: string;
  dogonName: string;
  description: string;
  behaviors: string[];
  petRecommendations: string[];
}

const lunarPhases: LunarPhase[] = [
  {
    name: 'New Moon', emoji: '🌑', dogonName: 'Tonu Nay',
    description: 'Time of new beginnings and inner reflection',
    behaviors: ['Calm and quiet behavior', 'Reduced activity', 'Increased sleep'],
    petRecommendations: ['Good time for new training', 'Introduce new foods', 'Routine checkups'],
  },
  {
    name: 'Waxing Crescent', emoji: '🌒', dogonName: 'Tonu Koro',
    description: 'Energy building and intention setting',
    behaviors: ['Slightly increased activity', 'More curious behavior', 'Playful mood'],
    petRecommendations: ['Begin new exercise routines', 'Socialization activities', 'Dental care'],
  },
  {
    name: 'First Quarter', emoji: '🌓', dogonName: 'Tonu Gundo',
    description: 'Action and challenges come to light',
    behaviors: ['Active and alert', 'May show independence', 'Exploring behavior'],
    petRecommendations: ['Active play sessions', 'Training challenges', 'Grooming'],
  },
  {
    name: 'Waxing Gibbous', emoji: '🌔', dogonName: 'Tonu Duge',
    description: 'Refinement and patience',
    behaviors: ['High energy levels', 'Social behavior increases', 'Appetite may increase'],
    petRecommendations: ['Extra exercise needed', 'Group activities', 'Nutritional check'],
  },
  {
    name: 'Full Moon', emoji: '🌕', dogonName: 'Tonu Puru',
    description: 'Peak energy and heightened awareness',
    behaviors: ['Maximum activity and alertness', 'Possible restlessness', 'Heightened sensitivity'],
    petRecommendations: ['Maintain calm environment', 'Extra exercise needed', 'Consider indoor activities at night'],
  },
  {
    name: 'Waning Gibbous', emoji: '🌖', dogonName: 'Tonu Galu',
    description: 'Gratitude and sharing wisdom',
    behaviors: ['Gradual calming', 'Social and communicative', 'Sharing behavior'],
    petRecommendations: ['Gentle activities', 'Socialization', 'Health monitoring'],
  },
  {
    name: 'Last Quarter', emoji: '🌗', dogonName: 'Tonu Sigi',
    description: 'Release and letting go',
    behaviors: ['More introspective', 'Reduced activity', 'Rest-seeking behavior'],
    petRecommendations: ['Quiet time', 'Gentle massage', 'Rest and recovery'],
  },
  {
    name: 'Waning Crescent', emoji: '🌘', dogonName: 'Tonu Yala',
    description: 'Rest, healing, and surrender',
    behaviors: ['Very calm behavior', 'Increased sleep', 'Healing and recovery'],
    petRecommendations: ['Restful environment', 'Healing foods', 'Minimal stimulation'],
  },
];

function getCurrentLunarPhase(): LunarPhase {
  const knownFullMoon = new Date('2024-01-25');
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - knownFullMoon.getTime()) / (1000 * 60 * 60 * 24));
  const cycleDay = ((daysSince % 29) + 29) % 29;
  if (cycleDay < 2) return lunarPhases[0];
  if (cycleDay < 6) return lunarPhases[1];
  if (cycleDay < 9) return lunarPhases[2];
  if (cycleDay < 13) return lunarPhases[3];
  if (cycleDay < 16) return lunarPhases[4];
  if (cycleDay < 20) return lunarPhases[5];
  if (cycleDay < 23) return lunarPhases[6];
  return lunarPhases[7];
}

export default function DogonCalendar() {
  const currentPhase = getCurrentLunarPhase();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-orange-950/40 to-red-950/40 border border-orange-800/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-amber-400 text-2xl font-bold">
            <Star size={24} /> Dogon Calendar &amp; Lunar Guide
          </h2>
          <Info size={20} className="text-white/40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-950/40 border border-orange-800/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Sun size={20} />
              <h3 className="font-semibold">Solar Calendar</h3>
            </div>
            <p className="text-white/60 text-sm mb-3">Based on Sirius (Sigi Tolo)</p>
            <ul className="space-y-1 text-white/70 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>12 months of 30 days</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>5 supplementary days</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>Agricultural alignment</li>
            </ul>
          </div>
          <div className="bg-blue-950/40 border border-blue-800/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Moon size={20} />
              <h3 className="font-semibold">Lunar Calendar</h3>
            </div>
            <p className="text-white/60 text-sm mb-3">Track moon phases</p>
            <ul className="space-y-1 text-white/70 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>8 lunar phases</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Spiritual cycles</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Ritual timing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-purple-950/40 border border-purple-800/30 rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-white font-semibold text-lg mb-4">
          <Moon size={20} className="text-blue-400" /> Lunar Phase &amp; Canine Behavior
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{currentPhase.emoji}</span>
              <div>
                <div className="text-amber-400 font-semibold text-lg">{currentPhase.name}</div>
                <div className="text-white/50 text-sm">Current Lunar Phase</div>
              </div>
            </div>
            <div className="bg-orange-950/30 border border-orange-800/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-3 font-medium">
                <span>🐕</span> Expected Behaviors
              </div>
              <ul className="space-y-1">
                {currentPhase.behaviors.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-amber-400">•</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-blue-950/30 border border-blue-800/20 rounded-xl p-4">
              <div className="text-blue-300 font-semibold mb-3">Pet Owner Recommendations</div>
              <ul className="space-y-2">
                {currentPhase.petRecommendations.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="text-amber-500">★</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-purple-950/30 rounded-lg">
          <p className="text-purple-300 text-sm italic">"{currentPhase.description}" — Dogon: {currentPhase.dogonName}</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-amber-400 font-semibold text-lg mb-4">All Lunar Phases</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {lunarPhases.map((phase) => (
            <div
              key={phase.name}
              className={"rounded-xl p-3 text-center border transition-all " + (phase.name === currentPhase.name ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/10')}
            >
              <div className="text-2xl mb-1">{phase.emoji}</div>
              <div className={"text-xs font-medium " + (phase.name === currentPhase.name ? 'text-amber-400' : 'text-white/70')}>{phase.name}</div>
              <div className="text-xs text-white/40 mt-0.5">{phase.dogonName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
