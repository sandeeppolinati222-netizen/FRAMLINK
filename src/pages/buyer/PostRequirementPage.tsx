import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Calendar, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { MOCK_HUBS } from '../../data/mockData';

export const PostRequirementPage: React.FC = () => {
  const { addBulkRequirement, addNotification } = useApp();
  const navigate = useNavigate();

  const [cropName, setCropName] = useState('Tomato');
  const [quantityKg, setQuantityKg] = useState<number>(2000);
  const [deliveryLocation, setDeliveryLocation] = useState('Vijayawada Central DC, MG Road');
  const [requiredByDate, setRequiredByDate] = useState('Friday (19 Sep 2026)');
  const [targetPrice, setTargetPrice] = useState<number>(30);
  const [gradeRequired, setGradeRequired] = useState('Grade A');

  const [isSearching, setIsSearching] = useState(false);
  const [hasMatched, setHasMatched] = useState(true);

  // Dynamic supply matching lots proportional to quantity
  const matchedLots = [
    { farmerName: 'Farmer Ravi Kumar', shareKg: Math.round(quantityKg * 0.15), village: 'Kadiyam (8km)', grade: 'Grade A', qcScore: '92%' },
    { farmerName: 'Farmer Suresh Varma', shareKg: Math.round(quantityKg * 0.225), village: 'Torredu (14km)', grade: 'Grade A', qcScore: '89%' },
    { farmerName: 'Farmer Lakshmi Devi', shareKg: Math.round(quantityKg * 0.25), village: 'Dowleswaram (9km)', grade: 'Grade A', qcScore: '94%' },
    { farmerName: 'Godavari Valley FPO Hub Lot', shareKg: Math.round(quantityKg * 0.375), village: 'Rajahmundry Central Hub', grade: 'Grade A', qcScore: '95%' },
  ];

  const totalMatchedKg = matchedLots.reduce((sum, l) => sum + l.shareKg, 0);

  const handleFindSupply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasMatched(true);
    }, 600);
  };

  const handleConfirmOrder = () => {
    addBulkRequirement({
      buyerId: 'buyer-freshmart',
      buyerName: 'FreshMart Supermarkets Ltd.',
      buyerType: 'Supermarket',
      cropName,
      variety: 'Table Fresh Grade',
      requiredQuantityKg: quantityKg,
      maxPricePerKg: targetPrice,
      deliveryLocation,
      requiredByDate,
      requiredGrade: (gradeRequired as any) || 'Grade A',
    });

    addNotification(
      'Bulk Requisition Matched & Funded',
      `${quantityKg.toLocaleString()} kg ${cropName} aggregated across 4 farmers and scheduled for dispatch to ${deliveryLocation}.`,
      'order',
      '/buyer'
    );

    navigate('/buyer');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/buyer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Buyer Procurement
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Multi-Farmer Supply Match Solver
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Specify your commercial produce requisition. The hub algorithm aggregates matching crates across verified local smallholders.
          </p>
        </div>

        {/* Input Requisition Card */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-xs mb-8">
          <form onSubmit={handleFindSupply} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1 uppercase tracking-wider text-[11px]">
                  PRODUCT
                </label>
                <select
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none font-medium"
                >
                  <option value="Tomato">Tomato (Roma / Hybrid)</option>
                  <option value="Onion">Onion (Nasik Dark Red)</option>
                  <option value="Potato">Potato (Table Jyoti)</option>
                  <option value="Chilli">Green / Red Chilli</option>
                  <option value="Rice">Paddy Rice (Sona Masoori)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1 uppercase tracking-wider text-[11px]">
                  QUANTITY (KG)
                </label>
                <input
                  type="number"
                  min="200"
                  step="50"
                  required
                  value={quantityKg}
                  onChange={e => setQuantityKg(Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1 uppercase tracking-wider text-[11px]">
                  DELIVERY LOCATION
                </label>
                <input
                  type="text"
                  required
                  value={deliveryLocation}
                  onChange={e => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Vijayawada Central DC"
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1 uppercase tracking-wider text-[11px]">
                  REQUIRED BY
                </label>
                <input
                  type="text"
                  required
                  value={requiredByDate}
                  onChange={e => setRequiredByDate(e.target.value)}
                  placeholder="e.g. Friday (19 Sep)"
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                loading={isSearching}
                icon={<Search className="w-4 h-4" />}
              >
                Find Supply
              </Button>
            </div>
          </form>
        </div>

        {/* Matched Aggregated Supply Output Panel */}
        {hasMatched && (
          <div className="bg-[#0b281b] text-white border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-500/30">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Supply Match Found
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {quantityKg.toLocaleString()} kg {cropName} Ready for Aggregation
                </h3>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>✓ Requirement 100% Fulfilled</span>
              </div>
            </div>

            {/* Individual constituent farmers display */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-300 block">
                Constituent Supply Lots:
              </span>

              <div className="space-y-2">
                {matchedLots.map((lot, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-400/50 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{lot.farmerName}</span>
                        <span className="text-stone-400 text-[11px]">{lot.village}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-emerald-300 block">
                        {lot.shareKg.toLocaleString()} kg
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {lot.grade} • {lot.qcScore} QC
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and Escrow Commitment */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Total Aggregated Volume:</span>
                <span className="text-xl font-bold font-mono text-white">
                  {totalMatchedKg.toLocaleString()} kg
                </span>
                <span className="text-[11px] text-emerald-400 block mt-0.5">
                  Consolidated at Rajahmundry Farm Hub for one single truck dispatch
                </span>
              </div>

              <div className="text-right">
                <span className="text-stone-400 block text-[11px]">Total Escrow Commitment:</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  ₹{(totalMatchedKg * targetPrice).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <Button
                size="lg"
                onClick={handleConfirmOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold"
                icon={<ShieldCheck className="w-5 h-5 text-stone-950" />}
              >
                Fulfill Requisition & Lock Escrow
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
