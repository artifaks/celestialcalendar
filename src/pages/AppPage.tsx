import { useState } from 'react';
import AstrologyCalculator from '../components/AstrologyCalculator';
import EgyptianCalendar from '../components/EgyptianCalendar';
import DogonCalendar from '../components/DogonCalendar';
import MayanCalendar from '../components/MayanCalendar';
import ProductRecommendations from '../components/ProductRecommendations';

type Tab = 'astrology' | 'egyptian' | 'dogon' | 'mayan';

const tabs: { id: Tab; label: string }[] = [
  { id: 'astrology', label: 'Astrology Calculator' },
  { id: 'egyptian', label: 'Egyptian Calendar' },
  { id: 'dogon', label: 'Dogon Calendar' },
  { id: 'mayan', label: 'Mayan Calendar' },
];

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>('astrology');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <div className="mb-8">
        {activeTab === 'astrology' && <AstrologyCalculator />}
        {activeTab === 'egyptian' && <EgyptianCalendar />}
        {activeTab === 'dogon' && <DogonCalendar />}
        {activeTab === 'mayan' && <MayanCalendar />}
      </div>

      {/* Product Recommendations */}
      <ProductRecommendations />
    </div>
  );
}
