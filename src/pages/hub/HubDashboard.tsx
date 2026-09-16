import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Thermometer, 
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { MOCK_HUBS } from '../../data/mockData';

export const HubDashboard: React.FC = () => {
  const { hubBatches, verifyHubBatch } = useApp();
  const [selectedHub, setSelectedHub] = useState(MOCK_HUBS[0]);

  // Intake batches for this hub
  const pendingBatches = hubBatches.filter(b => b.status === 'Incoming' || b.status === 'Intake Completed');
  const verifiedBatches = hubBatches.filter(b => b.status === 'Verified' || b.status === 'Dispatched');

  const coldStorageUsedPercent = 62;
  const coldStorageAvailPercent = 38;

  const sidebarItems = [
    { label: 'Hub Operations', href: '/hub', icon: Building2 },
    { label: 'AI Grading Terminal', href: '/hub/grading', icon: Sparkles, badge: 'QC' },
    { label: 'Marketplace Lots', href: '/marketplace', icon: Layers },
    { label: 'Logistics & Dispatch', href: '/logistics', icon: Truck },
    { label: 'Escrow Settlements', href: '/payments', icon: ShieldCheck },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-[#FBFBFA]">
      
      {/* SaaS Sidebar */}
      <Sidebar
        title="Farm Hub Operations"
        subtitle="Rajahmundry Terminal #01"
        items={sidebarItems}
        extraBottom={
          <div className="bg-stone-900 text-white rounded-xl p-3 text-xs">
            <div className="flex items-center justify-between text-stone-400 mb-1">
              <span>Intake Scale 01</span>
              <span className="text-emerald-400 font-mono">Calibrated</span>
            </div>
            <span className="font-bold text-white block">Digital Weigh-Bridge</span>
            <p className="text-stone-400 text-[11px] mt-0.5">Tolerance ±0.05% compliant with Legal Metrology Act.</p>
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>Central East Godavari Agri Corridor Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {selectedHub.name} Operations
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Intake weighing, optical computer vision grading, cold inventory preservation & commercial lot crating.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/hub/grading">
              <Button size="sm" icon={<Sparkles className="w-4 h-4 text-emerald-300" />}>
                Launch AI Grading Terminal
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Produce Received Today"
            value="14.8 Tonnes"
            subtext="38 Farmer delivery drop-offs"
            trend="+2.4 T vs yesterday"
            trendType="positive"
            icon={<Scale className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Total Stock in Hub"
            value="68.4 Tonnes"
            subtext="Across 12 crop types"
            icon={<Building2 className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Upcoming Dispatches"
            value="4 Trucks"
            subtext="Vijayawada & Hyderabad DCs"
            icon={<Truck className="w-5 h-5 text-purple-700" />}
          />
          <StatCard
            label="QC Verification Queue"
            value={`${pendingBatches.length} Batches`}
            subtext="Awaiting optical analysis"
            icon={<Sparkles className="w-5 h-5 text-amber-700" />}
          />
        </div>

        {/* Cold Storage & Capacity Status Bar */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Cold Storage Chamber Telemetry</h3>
                <p className="text-xs text-stone-500">Chamber #1 (0°C to 4°C) & Chamber #2 (10°C Controlled Humidity)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#125534]" /> Used: <strong>{coldStorageUsedPercent}%</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-200" /> Available: <strong>{coldStorageAvailPercent}%</strong>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-[#125534] h-full transition-all duration-500"
              style={{ width: `${coldStorageUsedPercent}%` }}
            />
            <div
              className="bg-stone-200 h-full"
              style={{ width: `${coldStorageAvailPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-stone-100 text-xs text-stone-600">
            <div>
              <span className="text-stone-400 block text-[11px]">Total Chamber Capacity:</span>
              <strong className="text-stone-900 font-mono">100 Metric Tonnes</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Current Cold Inventory:</span>
              <strong className="text-emerald-800 font-mono">62 Metric Tonnes</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Free Shelf Space:</span>
              <strong className="text-stone-900 font-mono">38 Metric Tonnes</strong>
            </div>
          </div>
        </div>

        {/* Quality Verification Queue Table */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">Quality Verification Queue</h3>
              <p className="text-xs text-stone-500">Incoming batches awaiting optical scanning and grade assignment</p>
            </div>
            <Link to="/hub/grading">
              <Button size="sm" variant="outline" className="text-xs" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Open Full Grading Console
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase font-mono tracking-wider">
                  <th className="pb-3 font-semibold">Batch ID</th>
                  <th className="pb-3 font-semibold">Farmer / FPO</th>
                  <th className="pb-3 font-semibold">Crop & Qty</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Assigned Grade</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {hubBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-stone-800">
                      {batch.id}
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-stone-900 block">{batch.farmerName}</span>
                      <span className="text-[11px] text-stone-500">{batch.intakeTimestamp}</span>
                    </td>
                    <td className="py-3.5 font-mono">
                      <strong className="text-stone-900 font-sans">{batch.cropName}</strong> ({batch.quantityKg} kg)
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={batch.status} />
                    </td>
                    <td className="py-3.5 font-mono">
                      {batch.assignedGrade ? (
                        <span className="font-bold text-[#125534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {batch.assignedGrade} ({batch.qualityScore}%)
                        </span>
                      ) : (
                        <span className="text-stone-400 italic">Pending Inspection</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      {batch.status !== 'Verified' ? (
                        <Link to="/hub/grading">
                          <Button size="sm" className="text-xs">
                            Grade Batch
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
