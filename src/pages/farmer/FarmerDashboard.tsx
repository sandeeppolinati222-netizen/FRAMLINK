import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import { 
  Package, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Plus, 
  Building2, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  Mic,
  Calendar,
  Layers
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { products, orders, setIsVoiceAssistantOpen } = useApp();

  // Filter products for this simulated farmer (Ravi Kumar)
  const myProducts = products.filter(p => p.farmerName.includes('Ravi') || p.farmerName.includes('Kumar') || products.indexOf(p) < 3);
  const myOrders = orders.slice(0, 4);

  const totalHarvestVolume = myProducts.reduce((sum, p) => sum + p.quantityKg, 0);
  const totalRevenue = 148500;

  const sidebarItems = [
    { label: 'Farmer Overview', href: '/farmer', icon: Layers },
    { label: 'Add New Produce', href: '/farmer/add', icon: Plus },
    { label: 'Voice Assistant', href: '#', icon: Mic, badge: 'Telugu' },
    { label: 'Hub Collections', href: '/hub', icon: Building2 },
    { label: 'Payment Escrow', href: '/payments', icon: ShieldCheck },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-[#FBFBFA]">
      
      {/* SaaS Sidebar */}
      <Sidebar
        title="Farmer Portal"
        subtitle="Ravi Kumar (Kisan ID: #AP-8842)"
        items={sidebarItems}
        extraBottom={
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
            <span className="font-bold text-[#125534] block">Kisan Voice Assistant</span>
            <p className="text-stone-600 mt-0.5 text-[11px]">List produce in Telugu by speaking naturally.</p>
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="mt-2 text-xs font-bold text-[#125534] underline flex items-center gap-1"
            >
              <Mic className="w-3.5 h-3.5" /> Start Speaking
            </button>
          </div>
        }
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>Verified FPO Producer • Kadiyam Mandal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Farmer Command Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Track your field harvests, farm hub intake grading, and verified escrow payments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVoiceAssistantOpen(true)}
              icon={<Mic className="w-4 h-4 text-emerald-700" />}
            >
              Voice Listing
            </Button>
            <Link to="/farmer/add">
              <Button size="sm" icon={<Plus className="w-4 h-4" />}>
                Add New Produce
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Harvest Listed"
            value={`${totalHarvestVolume.toLocaleString()} kg`}
            subtext="3 Active crop batches"
            trend="+12% from last harvest"
            trendType="positive"
            icon={<Package className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Active Orders"
            value={myOrders.length}
            subtext="In transit or scheduled"
            icon={<Clock className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Total Realized Revenue"
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            subtext="Direct bank transfer"
            trend="+100% fair price paid"
            trendType="positive"
            icon={<DollarSign className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Avg Quality Grade"
            value="Grade A (91%)"
            subtext="Rajahmundry Hub certified"
            icon={<Sparkles className="w-5 h-5 text-amber-700" />}
          />
        </div>

        {/* AI Market Advice Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-[#0e3022] text-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                AI Advisory Recommendation
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                Tomato demand in Vijayawada will rise by <strong>+18% next week</strong>. We recommend listing Roma varieties at <strong>₹30–₹34 / kg</strong> at Rajahmundry Farm Hub.
              </p>
            </div>
          </div>
          <Link to="/farmer/add" className="shrink-0">
            <Button size="sm" className="bg-emerald-400 text-stone-950 hover:bg-emerald-300 font-bold text-xs">
              List Tomatoes Now
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: My Listed Produce Table */}
          <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">My Listed Produce Lots</h3>
                <p className="text-xs text-stone-500">Live batches aggregated at your local farm hub</p>
              </div>
              <Link to="/marketplace" className="text-xs font-semibold text-[#125534] hover:underline flex items-center gap-1">
                View in Marketplace <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 uppercase font-mono tracking-wider">
                    <th className="pb-3 font-semibold">Crop & Variety</th>
                    <th className="pb-3 font-semibold">Quantity</th>
                    <th className="pb-3 font-semibold">Hub Station</th>
                    <th className="pb-3 font-semibold">Quality</th>
                    <th className="pb-3 font-semibold">Price / kg</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.imageUrl}
                            alt={p.cropName}
                            className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{p.cropName}</span>
                            <span className="text-[11px] text-stone-500">{p.variety}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-mono font-bold text-stone-800">
                        {p.quantityKg.toLocaleString()} kg
                      </td>
                      <td className="py-3.5 text-stone-600">
                        {p.hubName.split(' ')[0]} Hub
                      </td>
                      <td className="py-3.5">
                        <span className="font-mono bg-emerald-50 text-[#125534] px-2 py-0.5 rounded font-bold border border-emerald-200">
                          {p.grade} ({p.qualityScore}%)
                        </span>
                      </td>
                      <td className="py-3.5 font-mono font-bold text-stone-900">
                        ₹{p.pricePerKg}
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Live on Market
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Active Hub Intakes & Orders */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Hub Drop-off Status Card */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <span className="text-xs font-bold text-stone-900">Nearest Hub Schedule</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-[#125534] px-2 py-0.5 rounded font-bold">
                  Open Today
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <Building2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Rajahmundry Farm Hub</span>
                    <span className="text-stone-500 text-[11px]">8.2 km from your farm plot</span>
                    <div className="mt-2 text-[11px] text-stone-600">
                      Weigh-bridge slots available: <strong>07:00 AM – 12:30 PM</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-stone-500">Upcoming Delivery Slot</span>
                    <span className="font-bold text-emerald-700">Tomorrow, 08:30 AM</span>
                  </div>
                  <span className="font-bold text-stone-900 block">Lot #RM-289 (Chilli 200 kg)</span>
                </div>
              </div>
            </div>

            {/* Recent Orders Fulfilled */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <span className="text-xs font-bold text-stone-900">Recent Dispatches</span>
                <Link to="/payments" className="text-[11px] text-[#125534] font-semibold hover:underline">
                  Escrow Status
                </Link>
              </div>

              <div className="space-y-3">
                {myOrders.map(ord => (
                  <div key={ord.id} className="p-3 rounded-xl border border-stone-100 bg-stone-50/70 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-bold text-stone-900">{ord.id}</span>
                        <p className="text-[11px] text-stone-500">{ord.buyerName}</p>
                      </div>
                      <StatusBadge status={ord.escrow?.status || ord.status} />
                    </div>
                    <div className="mt-2 flex justify-between items-center text-[11px] font-mono">
                      <span className="text-stone-500">{(ord.quantityKg ?? 0).toLocaleString()} kg {ord.productName}</span>
                      <span className="font-bold text-emerald-800">₹{(ord.totalAmount ?? 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
