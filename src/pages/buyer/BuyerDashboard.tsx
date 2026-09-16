import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Sidebar } from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  Truck, 
  Plus, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Search,
  Building2
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { orders, bulkRequirements } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Delivered');
  const totalSpend = 384000;

  const sidebarItems = [
    { label: 'Procurement Center', href: '/buyer', icon: ShoppingBag },
    { label: 'Post Bulk Requisition', href: '/buyer/post', icon: Plus },
    { label: 'Browse Marketplace', href: '/marketplace', icon: Layers },
    { label: 'Cold Logistics Tracking', href: '/logistics', icon: Truck, badge: 'Live GPS' },
    { label: 'Escrow Settlements', href: '/payments', icon: ShieldCheck },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-[#FBFBFA]">
      
      {/* SaaS Sidebar */}
      <Sidebar
        title="Buyer Procurement"
        subtitle="FreshMart Supermarkets (AP)"
        items={sidebarItems}
        extraBottom={
          <div className="bg-stone-900 text-white rounded-xl p-3 text-xs">
            <span className="font-bold text-emerald-400 block">Bulk Procurement Escrow</span>
            <p className="text-stone-300 text-[11px] mt-0.5">
              100% funds held securely until physical delivery verification at your destination DC.
            </p>
          </div>
        }
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>Enterprise Commercial Account • 4 Retail Outlets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Bulk Buyer Procurement Center
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Source verified multi-farmer agricultural lots directly through local farm hubs without intermediate brokerage.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                Browse Spot Stock
              </Button>
            </Link>
            <Link to="/buyer/post">
              <Button size="sm" icon={<Plus className="w-4 h-4" />}>
                Post Bulk Requirement
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Procurements"
            value={`${activeOrders.length} Shipments`}
            subtext="In transit from farm hubs"
            icon={<Truck className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Open Requirements"
            value={bulkRequirements.length}
            subtext="Multi-farmer supply matched"
            trend="100% supply secured"
            trendType="positive"
            icon={<Layers className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Month Procurement Spend"
            value={`₹${totalSpend.toLocaleString('en-IN')}`}
            subtext="Saved ~₹68,000 vs Mandi"
            trend="+18% Margin Efficiency"
            trendType="positive"
            icon={<DollarSign className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Escrow Protected Capital"
            value="₹1,24,000"
            subtext="Locked in smart contract"
            icon={<ShieldCheck className="w-5 h-5 text-purple-700" />}
          />
        </div>

        {/* Active Bulk Requisitions & Supply Match Matrix */}
        <div className="space-y-8">
          
          {/* Section 1: My Open Bulk Requirements */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Active Bulk Requisitions</h3>
                <p className="text-xs text-stone-500">Requirements matched across constituent farmers and FPOs</p>
              </div>
              <Link to="/buyer/post">
                <Button size="sm" variant="secondary" className="text-xs" icon={<Plus className="w-3.5 h-3.5" />}>
                  New Requisition
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {bulkRequirements.map((req) => {
                const quantity = req.requiredQuantityKg ?? (req as any).quantityKg ?? 0;
                const price = req.maxPricePerKg ?? (req as any).targetPricePerKg ?? 0;
                const grade = req.requiredGrade ?? (req as any).gradeRequired ?? 'Grade A';
                const hub = (req as any).hubName ?? req.deliveryLocation;
                const supplies = req.matchedSupplies || (req as any).matchedSuppliers || [];

                return (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-xs bg-stone-200 px-2 py-0.5 rounded text-stone-800">
                          {req.id}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900">
                          {quantity.toLocaleString()} kg {req.cropName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={req.status} />
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Max ₹{price} / kg
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3 text-stone-600">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Delivery Location:</span>
                        <strong className="text-stone-800">{req.deliveryLocation}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Required By:</span>
                        <strong className="text-stone-800 font-mono">{req.requiredByDate}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Grade Specification:</span>
                        <strong className="text-emerald-800">{grade}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Aggregating Hub:</span>
                        <strong className="text-stone-800">{hub}</strong>
                      </div>
                    </div>

                    {/* Matched constituent lots preview */}
                    {supplies.length > 0 && (
                      <div className="pt-3 border-t border-stone-200/70">
                        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                          Constituent Farmer Lots Aggregated:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {supplies.map((sup: any, i: number) => {
                            const name = sup.supplierName || sup.farmerName || 'Farmer Partner';
                            const share = sup.quantityKg ?? sup.shareKg ?? 0;
                            const loc = sup.location || sup.village || 'Hub Zone';
                            return (
                              <span
                                key={i}
                                className="bg-white border border-stone-200 text-stone-700 text-xs px-2.5 py-1 rounded-md font-mono"
                              >
                                {name} • <strong className="text-stone-900">{share.toLocaleString()} kg</strong> ({loc})
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Order Tracking */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Procurement Orders & Deliveries</h3>
                <p className="text-xs text-stone-500">Live order fulfillment status and milestone updates</p>
              </div>
              <Link to="/logistics" className="text-xs font-semibold text-[#125534] hover:underline flex items-center gap-1">
                Open GPS Cold Chain Tracking <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 uppercase font-mono tracking-wider">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Produce & Quantity</th>
                    <th className="pb-3 font-semibold">Origin Hub</th>
                    <th className="pb-3 font-semibold">Total Escrow Value</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((ord) => {
                    const prodName = ord.productName || (ord as any).cropName || 'Farm Produce';
                    const kg = ord.quantityKg ?? (ord as any).totalKg ?? 0;
                    const amount = ord.totalAmount ?? 0;
                    return (
                      <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 font-mono font-bold text-stone-900">
                          {ord.id}
                        </td>
                        <td className="py-3.5">
                          <span className="font-bold text-stone-900 block">{prodName}</span>
                          <span className="font-mono text-stone-500">{kg.toLocaleString()} kg</span>
                        </td>
                        <td className="py-3.5 text-stone-600">
                          {ord.hubName}
                        </td>
                        <td className="py-3.5 font-mono font-bold text-stone-900">
                          ₹{amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={ord.status} />
                        </td>
                        <td className="py-3.5 text-right">
                          <Link to="/logistics">
                            <Button size="sm" variant="outline" className="text-xs">
                              Track Route
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
