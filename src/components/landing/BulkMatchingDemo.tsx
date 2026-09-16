import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, Clock, MapPin, Building2, Utensils, Store, Hotel, Factory, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BulkMatchingDemo: React.FC = () => {
  const [product, setProduct] = useState('Tomato');
  const [quantity, setQuantity] = useState(2000);
  const [location, setLocation] = useState('Vijayawada Central DC');
  const [requiredBy, setRequiredBy] = useState('This Friday (19 Sep)');
  const [isSearching, setIsSearching] = useState(false);
  const [hasMatched, setHasMatched] = useState(true);

  const buyerCategories = [
    { name: 'Supermarket Chains', icon: <Store className="w-4 h-4" /> },
    { name: 'Restaurants & Clouds', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Hotels & Caterers', icon: <Hotel className="w-4 h-4" /> },
    { name: 'Food Processors', icon: <Factory className="w-4 h-4" /> },
    { name: 'Retailers & Kiranas', icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const handleFindSupply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasMatched(true);
    }, 500);
  };

  // Matched supply lot calculation proportional to requested quantity
  const supplies = [
    { name: 'Farmer Ravi Kumar', type: 'Farmer', share: '300 kg', dist: 'Kadiyam (8km)', grade: 'Grade A', score: '91%' },
    { name: 'Farmer Suresh Varma', type: 'Farmer', share: '450 kg', dist: 'Torredu (14km)', grade: 'Grade A', score: '88%' },
    { name: 'Farmer Lakshmi Devi', type: 'Farmer', share: '500 kg', dist: 'Nunna (11km)', grade: 'Grade A', score: '93%' },
    { name: 'Godavari Valley FPO', type: 'FPO Cluster', share: '750 kg', dist: 'Rajahmundry Hub Lot #4', grade: 'Grade A', score: '94%' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Enterprise Agricultural Procurement
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Buy Agricultural Produce at Scale
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2">
            No single small farmer can supply 2,000 kg alone. Our hub algorithm aggregates constituent lots seamlessly into unified, graded commercial batches.
          </p>

          {/* Buyer Types Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            {buyerCategories.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300"
              >
                <span className="text-emerald-400">{c.icon}</span>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Matching Demonstration Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Side */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Procurement Requisition
                </span>
                <span className="text-[11px] text-stone-400">Interactive Simulator</span>
              </div>

              <form onSubmit={handleFindSupply} className="space-y-4 text-xs">
                <div>
                  <label className="text-stone-300 font-semibold block mb-1.5 uppercase tracking-wider text-[11px]">
                    PRODUCT
                  </label>
                  <select
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    className="w-full bg-stone-800/80 border border-stone-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    <option value="Tomato">Tomato (Roma / Hybrid)</option>
                    <option value="Potato">Potato (Jyoti Table)</option>
                    <option value="Onion">Onion (Nasik Dark Red)</option>
                    <option value="Rice">Rice (Sona Masoori)</option>
                    <option value="Chilli">Red Chilli (Guntur Teja)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                      QUANTITY REQUIRED
                    </label>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {quantity.toLocaleString()} kg ({quantity / 1000} Metric Tonnes)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
                    <span>500 kg</span>
                    <span>5,000 kg</span>
                    <span>10,000 kg</span>
                  </div>
                </div>

                <div>
                  <label className="text-stone-300 font-semibold block mb-1.5 uppercase tracking-wider text-[11px]">
                    DELIVERY LOCATION
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-stone-800/80 border border-stone-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-stone-300 font-semibold block mb-1.5 uppercase tracking-wider text-[11px]">
                    REQUIRED BY
                  </label>
                  <input
                    type="text"
                    value={requiredBy}
                    onChange={e => setRequiredBy(e.target.value)}
                    className="w-full bg-stone-800/80 border border-stone-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <Button
                  type="submit"
                  loading={isSearching}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white"
                  icon={<Search className="w-4 h-4" />}
                >
                  Find Supply
                </Button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-stone-400">
              * Matches supply across farmers within a 30km radius of the nearest regional farm hub.
            </div>
          </div>

          {/* Results Match Side */}
          <div className="lg:col-span-7 bg-[#0b281b] border border-emerald-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative">
            <div>
              {/* Header result */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-emerald-500/30 mb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Supply Match Found
                  </span>
                  <p className="text-xs text-stone-300">
                    Target: <strong className="text-white font-mono">{quantity.toLocaleString()} kg {product}</strong> • Destination: <strong className="text-white">{location}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Requirement Fulfilled</span>
                </div>
              </div>

              {/* Aggregation Constituent Farmers Table */}
              <div className="space-y-2.5 mb-6">
                <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Automated Multi-Source Lot Breakdown:
                </div>

                {supplies.map((sup, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-xs hover:border-emerald-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{sup.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                            {sup.type}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">{sup.dist}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-emerald-300 block">
                        {sup.share}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {sup.grade} • QC {sup.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logistics & Transit Summary */}
              <div className="grid grid-cols-3 gap-2 p-3.5 bg-black/30 border border-white/10 rounded-xl text-xs font-mono text-stone-300 mb-5">
                <div>
                  <span className="text-[10px] text-stone-400 block">Total Matched</span>
                  <span className="font-bold text-white text-sm">{quantity.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Recommended Hub</span>
                  <span className="font-bold text-emerald-400">Rajahmundry Hub</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Estimated Transit</span>
                  <span className="font-bold text-white">2.5 hours</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <Link to="/buyer/post">
                <Button
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Aggregated Bulk Order
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
