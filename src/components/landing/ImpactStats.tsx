import React from 'react';
import { Users, Building2, Scale, CheckCircle } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      label: 'Farmers Connected',
      value: '14,250+',
      subtext: 'Across Andhra Pradesh & Telangana',
      icon: <Users className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: 'Farm Hubs Active',
      value: '48 Hubs',
      subtext: 'With digital weigh-bridge & grading',
      icon: <Building2 className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: 'Produce Aggregated',
      value: '84,200 T',
      subtext: 'Zero distress sell reported',
      icon: <Scale className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: 'Orders Fulfilled',
      value: '99.4%',
      subtext: 'With 100% transparent escrow payout',
      icon: <CheckCircle className="w-5 h-5 text-emerald-700" />,
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-stone-200/70 bg-stone-50/50 hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-stone-700 mt-1">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
