import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Sidebar } from '../../components/common/Sidebar';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { MOCK_HUBS } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { products, orders, hubBatches } = useApp();

  const [disputeResolved, setDisputeResolved] = useState(false);

  const sidebarItems = [
    { label: 'Network Governance', href: '/admin', icon: ShieldCheck },
    { label: 'Farm Hub Directory', href: '/hub', icon: Building2 },
    { label: 'Marketplace Oversight', href: '/marketplace', icon: Layers },
    { label: 'Escrow Reserve Fund', href: '/payments', icon: DollarSign },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-[#FBFBFA]">
      
      {/* SaaS Sidebar */}
      <Sidebar
        title="Network Governance"
        subtitle="SIH AP Central Control"
        items={sidebarItems}
        extraBottom={
          <div className="bg-[#0e3022] text-white rounded-xl p-3 text-xs">
            <span className="font-bold text-emerald-400 block">AP Agri-Stack API v2.4</span>
            <p className="text-stone-300 text-[11px] mt-0.5">Connected to Govt e-NAM & AP Rythu Bharosa Kendras.</p>
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full mb-1 font-bold">
              <span>Super Admin Authority • SIH 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Agricultural Network Governance & Oversight
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Monitor regional hub throughput, fair price compliance, QC dispute resolution, and escrow solvency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-emerald-50 text-[#125534] border border-emerald-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              48 Hubs Synchronized
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Network Farmers"
            value="14,250+"
            subtext="Across 18 FPO federations"
            trend="+840 this month"
            trendType="positive"
            icon={<Users className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Gross Transacted Value"
            value="₹4.82 Cr"
            subtext="Zero middleman commissions"
            trend="+32% YoY growth"
            trendType="positive"
            icon={<DollarSign className="w-5 h-5 text-purple-700" />}
          />
          <StatCard
            label="Fair Price Compliance"
            value="98.2%"
            subtext="Farmers receive >82% of retail"
            trend="Exceeds MSP benchmark"
            trendType="positive"
            icon={<Sparkles className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Open Escalations"
            value={disputeResolved ? "0 Disputed" : "1 Disputed"}
            subtext="Handled via Hub QC logs"
            icon={<AlertTriangle className="w-5 h-5 text-amber-700" />}
          />
        </div>

        <div className="space-y-8">
          
          {/* Section 1: Regional Hub Performance Grid */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Farm Hub Infrastructure Status</h3>
                <p className="text-xs text-stone-500">Active regional collection, weighing, and optical grading nodes</p>
              </div>
              <span className="text-xs font-mono text-stone-400">Showing 4 Pilot Corridors</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_HUBS.map((hub) => (
                <div
                  key={hub.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-800" />
                      <h4 className="font-bold text-stone-900 text-sm">{hub.name}</h4>
                    </div>
                    <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Active Node
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{hub.district}, {hub.state}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Today Intake</span>
                      <strong className="text-stone-900 font-mono">{hub.currentOccupancyTonnes} Tonnes</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Capacity</span>
                      <strong className="text-stone-900 font-mono">{hub.capacityTonnes} Tonnes</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Cold Storage</span>
                      <strong className="text-emerald-800">
                        {hub.coldStorageAvailable ? 'Active' : 'Ambient'}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Dispute Resolution Terminal */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Dispute Resolution & Quality Audit Desk</h3>
                <p className="text-xs text-stone-500">Automated audit trail using AI grading snapshots to resolve weight and grade claim disputes</p>
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md font-bold">
                Mediation Engine
              </span>
            </div>

            {!disputeResolved ? (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="font-bold text-amber-950">
                      Dispute #DSP-904: Buyer FreshMart flagged Grade discrepancy on Batch #BATCH-102 (Tomato 450 kg)
                    </span>
                  </div>
                  <span className="font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Under Review
                  </span>
                </div>

                <p className="text-stone-700 leading-relaxed">
                  Buyer claims lot has 4% skin scuffing. Optical sensor log at Rajahmundry Farm Hub recorded <strong>91% Quality Score (Grade A)</strong> with timestamped 4K photo proof. Legal Metrology calibrated weigh-slip confirms exactly 450.4 kg intake.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-amber-200">
                  <span className="text-stone-500 text-[11px]">Audit Recommendation: Uphold Grade A. Release full escrow to Farmer.</span>
                  <Button
                    size="sm"
                    onClick={() => setDisputeResolved(true)}
                    className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white"
                  >
                    Confirm Optical Audit & Release Escrow
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-emerald-950">
                    Dispute #DSP-904 successfully resolved. Full ₹13,500 escrow released to Farmer Ravi Kumar.
                  </span>
                </div>
                <span className="font-mono text-emerald-800 font-bold">CLOSED</span>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
};
