import { Link } from 'react-router-dom';
import { Star, Calendar, Moon, Sun, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const features = [
    {
      icon: <Star size={28} className="text-amber-400" />,
      title: 'Astrology Calculator',
      description: 'Calculate and interpret your sun and moon signs based on birth date, time, and location.',
    },
    {
      icon: <Calendar size={28} className="text-amber-400" />,
      title: 'Egyptian Calendar',
      description: 'Ancient Egyptian timekeeping with lunar phases and religious festivals.',
    },
    {
      icon: <Moon size={28} className="text-amber-400" />,
      title: 'Dogon Calendar',
      description: 'Traditional Dogon dual calendar system with solar and lunar tracking.',
    },
    {
      icon: <Sun size={28} className="text-amber-400" />,
      title: 'Mayan Calendar',
      description: 'Complex Mayan calendar systems including Tzolkin and Haab calculations.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-400 mb-6">
          Celestial Calendar Systems
        </h1>
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mb-10">
          Explore ancient wisdom through multiple calendar systems and discover
          your cosmic connections.
        </p>

        {/* Email Subscribe */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-4 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-amber-400"
          />
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors">
            Subscribe
          </button>
        </form>
        {subscribed && (
          <p className="text-green-400 text-sm mb-4">Thank you for subscribing!</p>
        )}
        <p className="text-purple-300/60 text-sm">
          Join our community to receive celestial insights and updates.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-amber-400">{feature.title}</h3>
              </div>
              <p className="text-purple-200/80">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/app"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Explore Calendars <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
