import React from 'react';
import { Smartphone, Building2, Sparkles, Network, Truck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Farmer Lists Produce',
      desc: 'Smallholder farmers or FPOs list crops via regional Kisan Voice Assistant or smartphone in 30 seconds.',
      icon: <Smartphone className="w-5 h-5 text-emerald-800" />,
    },
    {
      step: '02',
      title: 'Nearest Farm Hub Collects',
      desc: 'Produce is brought to the village cluster hub (avg 5-8km) for automated weighing and digital logging.',
      icon: <Building2 className="w-5 h-5 text-emerald-800" />,
    },
    {
      step: '03',
      title: 'AI Quality Grading',
      desc: 'Computer vision optical scanning assigns an indisputable Grade A/B/C and quality score with zero bias.',
      icon: <Sparkles className="w-5 h-5 text-emerald-800" />,
    },
    {
      step: '04',
      title: 'Smart Matching',
      desc: 'Algorithm aggregates individual farm crates into bulk commercial orders requested by buyers.',
      icon: <Network className="w-5 h-5 text-emerald-800" />,
    },
    {
      step: '05',
      title: 'Optimized Delivery',
      desc: 'Direct dispatch via temperature-controlled transport with escrow payout released on verified handover.',
      icon: <Truck className="w-5 h-5 text-emerald-800" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#FBFBFA] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#125534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intelligent Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            How The Smart Network Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Eliminating 4 to 6 unnecessary middlemen through local hub aggregation and AI verification.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {/* Subtle connecting horizontal line */}
          <div className="absolute top-1/4 left-8 right-8 h-0.5 bg-stone-200 -z-0" />

          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-stone-200/80 rounded-xl p-5 z-10 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-sm tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="mt-4 pt-2 border-t border-stone-100 flex justify-end">
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-emerald-700 transition-colors" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex items-start gap-4"
            >
              <div className="flex flex-col items-center shrink-0">
                <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded mb-2">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-900 text-base mb-1">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
