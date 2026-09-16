import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowRight, ShieldCheck, Sparkles, Building2, Truck, Users, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/70">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-amber-50/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-[#125534]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Smart India Hackathon 2026 Initiative</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              From Farm to Buyer.{' '}
              <span className="text-[#125534]">Direct. Transparent. Smarter.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Connect farmers and FPOs directly with consumers, retailers and bulk buyers through intelligent local farm hubs, AI-assisted quality grading and optimized logistics.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/farmer/add">
                <Button size="lg" className="shadow-sm" icon={<ArrowRight className="w-4 h-4" />}>
                  Start Selling
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg">
                  Explore Marketplace
                </Button>
              </Link>
            </div>

            {/* Quick Proof Pills */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#125534] shrink-0" />
                <span>Zero Middlemen Commission</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#125534] shrink-0" />
                <span>AI Optical Quality Grading</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#125534] shrink-0" />
                <span>Guaranteed Escrow Payouts</span>
              </div>
            </div>
          </div>

          {/* Right Supply Chain Interactive Visualization */}
          <div className="lg:col-span-6">
            <div className="relative bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Agricultural Supply Engine
                  </span>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">Physical Hub Aggregation & Quality Route</p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  Live Sync
                </div>
              </div>

              {/* Step Sequence Flow */}
              <div className="space-y-4">
                
                {/* 1. Farmer Node */}
                <div className="flex items-center gap-4 p-3.5 bg-stone-50/90 border border-stone-200/80 rounded-xl hover:border-emerald-300 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">1. Farmers & FPOs</span>
                      <span className="text-[11px] font-mono text-emerald-700 font-semibold">1,250 kg Harvested</span>
                    </div>
                    <p className="text-xs text-stone-500 truncate">Ravi Kumar (Kadiyam) + Suresh (Torredu) list produce via Voice/App</p>
                  </div>
                </div>

                {/* Connector arrow */}
                <div className="flex items-center justify-center text-stone-400 -my-2">
                  <span className="text-xs font-mono bg-white px-2 py-0.5 border border-stone-200 rounded text-stone-700">
                    ↓ Local Aggregation (Avg. 6.4 km radius)
                  </span>
                </div>

                {/* 2. Hub Node */}
                <div className="flex items-center gap-4 p-3.5 bg-emerald-50/50 border border-emerald-200/80 rounded-xl">
                  <div className="w-11 h-11 rounded-xl bg-[#0e3022] text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">2. Rajahmundry Farm Hub</span>
                      <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        AI Grade A • 91% Score
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 truncate">Digital weigh-bridge intake, optical quality certification & batching</p>
                  </div>
                </div>

                {/* Connector arrow */}
                <div className="flex items-center justify-center text-stone-400 -my-2">
                  <span className="text-xs font-mono bg-white px-2 py-0.5 border border-stone-200 rounded text-stone-700">
                    ↓ Direct Smart Marketplace Matching
                  </span>
                </div>

                {/* 3. Buyer Node */}
                <div className="flex items-center gap-4 p-3.5 bg-stone-50/90 border border-stone-200/80 rounded-xl">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-200 text-blue-900 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">3. Buyer & Cold Logistics</span>
                      <span className="text-[11px] font-mono text-blue-700 font-semibold">FreshMart Vijayawada</span>
                    </div>
                    <p className="text-xs text-stone-500 truncate">Optimized route, GPS cold-chain tracking, arrival in 2.5 hours</p>
                  </div>
                </div>

                {/* 4. Escrow Node */}
                <div className="p-3 bg-stone-900 text-white rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Smart Escrow: ₹60,000 released upon digital sign-off</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">100% Guaranteed</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
