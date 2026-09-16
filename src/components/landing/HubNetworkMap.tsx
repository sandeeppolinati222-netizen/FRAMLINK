import React, { useState } from 'react';
import { Building2, ShoppingBag, MapPin, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { MOCK_HUBS } from '../../data/mockData';

export const HubNetworkMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState(MOCK_HUBS[0]);

  const villageNodes = [
    { name: 'Kadiyam (Village A)', dist: '4.2 km', farmers: 42, crops: 'Tomato, Chilli', capacity: '18 T' },
    { name: 'Dowleswaram (Village B)', dist: '6.1 km', farmers: 38, crops: 'Potato, Onion', capacity: '14 T' },
    { name: 'Rajanagaram (Village C)', dist: '7.8 km', farmers: 56, crops: 'Paddy Rice, Mango', capacity: '26 T' },
    { name: 'Torredu (Village D)', dist: '5.5 km', farmers: 29, crops: 'Vegetables & Leafy', capacity: '10 T' },
  ];

  const buyers = [
    { name: 'FreshMart Supermarkets', demand: '2,000 kg Tomatoes', type: 'Retail Chain' },
    { name: 'Deccan Agro Food Processors', demand: '5,000 kg Onions', type: 'Processing' },
    { name: 'City Hospital & Hotel Canteen', demand: '800 kg Assorted Veg', type: 'Institutional' },
  ];

  return (
    <section id="hubs" className="py-16 sm:py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#125534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Micro-Aggregation Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
              The Local Farm Hub Network
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              Instead of forcing small farmers to transport produce 50km to distant APMC mandis, local farm hubs aggregate within a 10km radius.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg self-start">
            {MOCK_HUBS.map(hub => (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedHub.id === hub.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {hub.name.split(' ')[0]} Hub
              </button>
            ))}
          </div>
        </div>

        {/* Visual Network Architecture Diagram */}
        <div className="bg-[#0e3022] text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-stone-800">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2ea376_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 4 Village Source Nodes */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2 font-bold">
                <span>Produce Origination</span>
                <span>Smallholder Clusters</span>
              </div>

              {villageNodes.map((v, i) => (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 rounded-xl p-3.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-white">{v.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold">{v.dist}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-300">
                    <span>{v.farmers} Farmers Registered</span>
                    <span className="text-white/80">{v.capacity} capacity</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center: The Local Farm Hub (Aggregation & Grading) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              {/* Animated convergence badge */}
              <div className="hidden lg:flex flex-col items-center gap-1 my-2">
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                  Aggregating 4 Villages
                </span>
                <span className="text-emerald-400 text-xs">➔ ➔ ➔</span>
              </div>

              <div className="w-full bg-gradient-to-b from-[#154532] to-[#081c14] border-2 border-emerald-500/80 rounded-2xl p-6 text-center shadow-2xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-[#081c14] text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Hub Aggregation Center
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-emerald-400 mb-3 border border-white/20">
                  <Building2 className="w-7 h-7" />
                </div>

                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {selectedHub.name}
                </h3>
                <p className="text-xs text-emerald-300/80 mt-1">{selectedHub.district}, {selectedHub.state}</p>

                <div className="my-4 py-3 border-y border-white/10 grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-mono">Today's Intake</span>
                    <span className="font-bold text-white font-mono">{selectedHub.currentOccupancyTonnes} Tonnes</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-mono">Cold Storage</span>
                    <span className="font-bold text-emerald-400">{selectedHub.coldStorageAvailable ? 'Active (0–4°C)' : 'Ambient Only'}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left text-[11px] text-stone-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automated digital weigh-bridge</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>AI Optical Computer Vision Grading</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Standardized reusable crate lot packaging</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-center gap-1 my-2">
                <span className="text-emerald-400 text-xs">➔ ➔ ➔</span>
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                  Direct Dispatch
                </span>
              </div>
            </div>

            {/* Right: Direct Buyers */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2 font-bold">
                <span>Market Demand</span>
                <span>Direct Buyers</span>
              </div>

              {buyers.map((b, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/10 rounded-xl p-3.5 hover:border-blue-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-bold text-white">{b.name}</span>
                    </div>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-medium">
                      {b.type}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-mono font-semibold text-emerald-300">
                    Demand: {b.demand}
                  </div>
                  <p className="text-[10px] text-stone-300 mt-1">
                    Direct delivery from Hub • Escrow payment secured
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
