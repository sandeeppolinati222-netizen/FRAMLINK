import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Building2, 
  Users, 
  CreditCard,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentsEscrowPage: React.FC = () => {
  const { orders, updateOrderStatus, addNotification } = useApp();
  const [filter, setFilter] = useState<'All' | 'Escrow Secured' | 'Released to Farmer'>('All');

  const isEscrowSecured = (o: any) => o.escrow?.status === 'Held Securely' || o.status !== 'Delivered';
  const isReleased = (o: any) => o.escrow?.status === 'Payment Released' || o.status === 'Delivered';

  const filteredOrders = orders.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'Escrow Secured') return isEscrowSecured(o);
    if (filter === 'Released to Farmer') return isReleased(o);
    return true;
  });

  const totalEscrowLocked = orders
    .filter(isEscrowSecured)
    .reduce((sum, o) => sum + (o.escrow?.farmerPayout || Math.round(o.totalAmount * 0.86)), 0);

  const totalReleased = orders
    .filter(isReleased)
    .reduce((sum, o) => sum + (o.escrow?.farmerPayout || Math.round(o.totalAmount * 0.86)), 0);

  const handleSimulateRelease = (orderId: string) => {
    updateOrderStatus(orderId, 'Delivered');
    addNotification(
      'Escrow Funds Released',
      `Payment for ${orderId} has been split and transferred to Farmer and Local Farm Hub accounts via IMPS/UPI.`,
      'payment',
      '/payments'
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#125534] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Smart India Hackathon FinTech Layer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Smart Escrow & Guaranteed Settlements
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Preventing payment default and delayed mandi cheques. Funds are pre-locked in escrow and automatically released upon verified digital delivery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                Marketplace
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Step Escrow Explainer Strip */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              The 3-Stage Escrow Trust Protocol
            </span>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              RBI Digital Payment Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  STAGE 01
                </span>
                <Lock className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Buyer Funds Escrow</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                When an order is created, the buyer deposits 100% of the consignment amount into the Smart Farm Network escrow vault.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                  STAGE 02
                </span>
                <Clock className="w-4 h-4 text-blue-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Produce Delivered & Verified</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Produce is transported via cold logistics. Receiver inspects weight and quality at the dock and signs off digitally.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  STAGE 03
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm">Payment Released to Farmer</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Within 15 minutes of verification, funds are automatically distributed directly into farmer & hub bank accounts (zero delay).
              </p>
            </div>

          </div>
        </div>

        {/* 3 Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Escrow Currently Secured"
            value={`₹${totalEscrowLocked.toLocaleString('en-IN')}`}
            subtext="Guaranteed safe in vault"
            icon={<Lock className="w-5 h-5 text-amber-700" />}
          />
          <StatCard
            label="Total Released to Farmers"
            value={`₹${totalReleased.toLocaleString('en-IN')}`}
            subtext="Paid out instantly via UPI/IMPS"
            trend="100% On-Time Record"
            trendType="positive"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Average Settlement Speed"
            value="14 Minutes"
            subtext="Post dock verification"
            icon={<Clock className="w-5 h-5 text-purple-700" />}
          />
        </div>

        {/* Escrow Ledger & Transactions Table */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">Escrow Transaction Ledger</h3>
              <p className="text-xs text-stone-500">Live smart contract agreements and automated payouts</p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg text-xs">
              {(['All', 'Escrow Secured', 'Released to Farmer'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    filter === f ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase font-mono tracking-wider">
                  <th className="pb-3 font-semibold">Agreement ID</th>
                  <th className="pb-3 font-semibold">Buyer</th>
                  <th className="pb-3 font-semibold">Consignment</th>
                  <th className="pb-3 font-semibold">Vault Amount</th>
                  <th className="pb-3 font-semibold">Escrow Status</th>
                  <th className="pb-3 font-semibold text-right">Action / Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-stone-900">
                      {ord.id}
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-stone-900 block">{ord.buyerName}</span>
                      <span className="text-[11px] text-stone-500">Hub: {ord.hubName}</span>
                    </td>
                    <td className="py-3.5">
                      <strong className="text-stone-900">{ord.productName || (ord as any).cropName || 'Farm Lot'}</strong>
                      <span className="font-mono text-stone-500 block text-[11px]">{(ord.quantityKg ?? (ord as any).totalKg ?? 0).toLocaleString()} kg</span>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-stone-900 text-sm">
                      ₹{(ord.totalAmount ?? 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={isReleased(ord) ? 'Payment Released' : 'Held Securely'} />
                    </td>
                    <td className="py-3.5 text-right">
                      {!isReleased(ord) ? (
                        <Button
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSimulateRelease(ord.id)}
                        >
                          Verify & Release Payment
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Paid to Farmer
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
