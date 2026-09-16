import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { 
  Truck, 
  MapPin, 
  Thermometer, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  ArrowRight,
  Phone,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LogisticsPage: React.FC = () => {
  const { orders } = useApp();
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);

  const selectedOrder = orders[selectedOrderIndex] || orders[0] || {} as any;

  const logistics = {
    driverName: selectedOrder.driverName || selectedOrder.logistics?.driverName || 'S. Appa Rao',
    driverPhone: selectedOrder.driverPhone || selectedOrder.logistics?.driverPhone || '+91 97001 22334',
    vehicleNumber: selectedOrder.vehicleNumber || selectedOrder.logistics?.vehicleNumber || 'AP 05 TA 4421 (Refrigerated 14ft)',
    temperatureCelsius: selectedOrder.currentTempC ?? selectedOrder.logistics?.temperatureCelsius ?? 4.2,
    originHub: selectedOrder.hubName || selectedOrder.logistics?.originHub || 'Rajahmundry Farm Hub',
    destination: selectedOrder.deliveryAddress || selectedOrder.logistics?.destination || 'FreshMart DC, Vijayawada',
    estimatedArrival: selectedOrder.estimatedDelivery || selectedOrder.logistics?.estimatedArrival || '12:45 PM IST',
  };

  const milestones = [
    { label: 'Farm Hub Dispatch', time: '08:15 AM', location: 'Rajahmundry Central Hub', status: 'Completed', details: 'Vehicle loaded & seal #EG-882 locked' },
    { label: 'Weigh Bridge Check', time: '08:45 AM', location: 'Devarapalli Checkpoint', status: 'Completed', details: 'Gross vehicle weight verified' },
    { label: 'Cold-Chain Highway Transit', time: '10:30 AM', location: 'NH-16 Eluru Bypass', status: 'In Transit', details: 'Chamber temperature steady at 4.1°C' },
    { label: 'Destination Intake', time: 'Est. 12:45 PM', location: 'FreshMart Vijayawada DC', status: 'Pending', details: 'Dock bay #03 reserved' },
    { label: 'Escrow Sign-off', time: 'Est. 01:15 PM', location: 'Digital Receiver Signature', status: 'Pending', details: 'Instant bank payout on acceptance' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Live Telemetry Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Cold-Chain Logistics & GPS Fleet Tracking
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time vehicle telemetry, temperature compliance logs, and transit milestones from local farm hubs to buyer docks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                Marketplace
              </Button>
            </Link>
            <Link to="/payments">
              <Button size="sm" icon={<ShieldCheck className="w-4 h-4" />}>
                Escrow Settlement
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Fleet in Transit"
            value="4 Reefers"
            subtext="Covering 480 km network"
            icon={<Truck className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Chamber Temp Compliance"
            value="99.8%"
            subtext="Strict 2°C – 6°C range"
            trend="Zero spoilage"
            trendType="positive"
            icon={<Thermometer className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Avg Transit Duration"
            value="3.2 Hours"
            subtext="Hub to buyer direct"
            icon={<Clock className="w-5 h-5 text-purple-700" />}
          />
          <StatCard
            label="On-Time Delivery Rate"
            value="98.7%"
            subtext="With live GPS telemetry"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-800" />}
          />
        </div>

        {/* Interactive Active Consignment Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Shipment Selector & Vehicle Dossier */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Active Shipments List */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block mb-3">
                Active Shipments ({orders.length})
              </span>

              <div className="space-y-2">
                {orders.map((ord, idx) => (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrderIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedOrderIndex === idx
                        ? 'border-[#125534] bg-emerald-50/60 ring-1 ring-[#125534]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-stone-900">{ord.id}</span>
                      <StatusBadge status={ord.status} />
                    </div>
                    <div className="font-bold text-stone-800">{ord.productName || (ord as any).cropName || 'Produce Batch'} • {(ord.quantityKg ?? (ord as any).totalKg ?? 0).toLocaleString()} kg</div>
                    <div className="text-stone-500 text-[11px] mt-1 flex justify-between">
                      <span>To: {ord.buyerName}</span>
                      <span className="font-mono font-semibold text-emerald-800">₹{(ord.totalAmount ?? 0).toLocaleString('en-IN')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle & Driver Card */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Vehicle & Driver Profile
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Verified Pilot
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700">
                  <UserCheck className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {logistics.driverName}
                  </h4>
                  <span className="text-xs text-stone-500 block">Commercial Heavy Pilot • 8 yrs exp</span>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">{logistics.driverPhone}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Vehicle Registration:</span>
                  <span className="font-mono font-bold text-stone-900">{logistics.vehicleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Reefer Chamber Status:</span>
                  <span className="font-mono font-bold text-[#125534]">{logistics.temperatureCelsius}°C (Active Chilling)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Speed / Battery:</span>
                  <span className="font-mono text-stone-800">54 km/h • 98% GPS Battery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Route Map Visualization & Milestone Stepper */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visual Route Canvas */}
            <div className="bg-[#081c14] text-white border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Transit Corridor: NH-16 Coastal Trunk
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {logistics.originHub} → {logistics.destination}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
                    <span className="text-stone-400 block text-[10px]">ETA</span>
                    <span className="font-bold text-emerald-300">{logistics.estimatedArrival}</span>
                  </div>
                  <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
                    <span className="text-stone-400 block text-[10px]">Chamber Temp</span>
                    <span className="font-bold text-emerald-300">{logistics.temperatureCelsius}°C</span>
                  </div>
                </div>
              </div>

              {/* Graphic Waypoint Track */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 my-4 relative">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
                  
                  {/* Origin */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mb-2 shadow-lg">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white block">{logistics.originHub}</span>
                    <span className="text-[10px] text-stone-400 font-mono">Dispatched 08:15 AM</span>
                  </div>

                  {/* Truck Moving along line */}
                  <div className="flex-1 w-full flex flex-col items-center">
                    <div className="w-full flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
                      <span>72 km completed</span>
                      <span className="text-white font-bold animate-pulse">🚗 Moving at 54 km/h</span>
                      <span>54 km remaining</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-400 h-full w-[60%]" />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-2 shadow-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white block">{logistics.destination}</span>
                    <span className="text-[10px] text-stone-400 font-mono">Expected 12:45 PM</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Step-by-Step Delivery Milestones */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">
                Verifiable Delivery Milestones
              </h3>

              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 text-xs">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          m.status === 'Completed'
                            ? 'bg-emerald-100 text-[#125534]'
                            : m.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800 animate-pulse'
                            : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {m.status === 'Completed' ? '✓' : i + 1}
                      </div>
                      {i < milestones.length - 1 && <div className="w-0.5 h-10 bg-stone-200 my-1" />}
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-sm">{m.label}</span>
                        <span className="font-mono text-stone-500">{m.time}</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">{m.location} • {m.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
