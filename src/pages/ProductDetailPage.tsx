import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Share2, 
  ArrowLeft,
  Users,
  Award,
  Lock,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id) || products[0];
  const [orderQuantity, setOrderQuantity] = useState(product?.minOrderKg || 50);
  const [activeTab, setActiveTab] = useState<'overview' | 'grading' | 'traceability' | 'journey'>('overview');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Product not found.</p>
        <Link to="/marketplace" className="text-[#125534] font-semibold mt-2 inline-block">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, orderQuantity);
  };

  const handleBuyNow = () => {
    addToCart(product, orderQuantity);
  };

  const journeySteps = [
    { step: 'Farmer Harvest', title: 'Farmer / FPO Cluster', desc: `Harvested by ${product.farmerName} at ${product.farmerLocation} on ${product.harvestDate}`, icon: <Users className="w-4 h-4" /> },
    { step: 'Local Aggregation', title: 'Farm Hub Intake', desc: `Transported directly to ${product.hubName} (Avg distance ${product.distanceKm} km)`, icon: <Building2 className="w-4 h-4" /> },
    { step: 'Verification', title: 'AI Quality Check', desc: `Multi-spectral computer vision confirmed ${product.grade} (Quality Score: ${product.qualityScore}%)`, icon: <Sparkles className="w-4 h-4" /> },
    { step: 'Lot Batching', title: 'Aggregation & Crating', desc: 'Standardized into reusable ventilated crates with QR tracking codes', icon: <Scale className="w-4 h-4" /> },
    { step: 'Commercial Dispatch', title: 'Buyer Delivery & Escrow', desc: 'Dispatched via cold logistics; payment locked in Escrow until verified delivery', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/marketplace" className="hover:text-stone-900">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-800 font-semibold truncate">{product.cropName}</span>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* Left Image & Quality Certificate Callout */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={product.imageUrl}
                  alt={product.cropName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <StatusBadge status={product.grade} />
                  {product.organic && <StatusBadge status="Organic" />}
                  {product.verified && (
                    <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hub Verified
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>QC Score: <strong>{product.qualityScore}%</strong></span>
                  <span className="text-stone-400">|</span>
                  <span>Confidence: <strong>{product.aiGradingReport.confidence}%</strong></span>
                </div>
              </div>

              {/* Verified Digital Certificate Seal */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">Hub Digital Quality Passport</h4>
                    <p className="text-[11px] text-stone-600">Issued at {product.hubName} • Inspector: {product.traceability.inspectorName}</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] bg-white px-2 py-1 rounded border border-emerald-200 text-emerald-800 font-bold">
                  ✓ PASSED
                </span>
              </div>
            </div>

            {/* Right Details & Order Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
                    {product.category} • {product.variety}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  {product.cropName}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price block */}
                <div className="mt-5 p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider block font-semibold">Direct Price</span>
                    <div className="text-3xl font-extrabold font-mono text-stone-900">
                      ₹{product.pricePerKg} <span className="text-sm font-sans font-normal text-stone-500">/ kg</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-500">
                    <div>Available: <strong className="text-stone-900 font-mono font-bold">{(product.quantityKg ?? 0).toLocaleString()} kg</strong></div>
                    <div>Min Order: <strong className="text-stone-900 font-mono">{product.minOrderKg} kg</strong></div>
                  </div>
                </div>

                {/* Logistics Key Points */}
                <div className="grid grid-cols-2 gap-3 my-5 text-xs text-stone-600">
                  <div className="p-3 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[11px]">Aggregating Hub</span>
                    <span className="font-bold text-stone-900 truncate block">{product.hubName}</span>
                    <span className="text-[10px] text-emerald-700">{product.distanceKm} km from harvest</span>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[11px]">Primary Farmer / Source</span>
                    <span className="font-bold text-stone-900 truncate block">{product.farmerName}</span>
                    <span className="text-[10px] text-stone-500">{product.farmerLocation}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[11px]">Harvest Date</span>
                    <span className="font-bold text-stone-900 block font-mono">{product.harvestDate}</span>
                    <span className="text-[10px] text-stone-500">Shelf life: ~{product.expiryDays} days</span>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200">
                    <span className="text-stone-400 block text-[11px]">Moisture / Firmness</span>
                    <span className="font-bold text-stone-900 block font-mono">
                      {product.aiGradingReport?.moistureContent || 'Optimal'}
                    </span>
                    <span className="text-[10px] text-emerald-700">{product.aiGradingReport?.firmnessIndex || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Order Quantity and Actions */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                      Order Quantity (kg)
                    </label>
                    <span className="text-[11px] text-stone-400">Total Price: <strong>₹{(orderQuantity * (product.pricePerKg ?? 0)).toLocaleString('en-IN')}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOrderQuantity(q => Math.max(product.minOrderKg, q - 25))}
                      className="w-8 h-8 rounded-lg border border-stone-300 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={product.minOrderKg}
                      max={product.quantityKg}
                      step="25"
                      value={orderQuantity}
                      onChange={e => setOrderQuantity(Number(e.target.value))}
                      className="w-20 text-center font-mono font-bold text-stone-900 border border-stone-200 rounded-lg py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#125534]"
                    />
                    <button
                      onClick={() => setOrderQuantity(q => Math.min(product.quantityKg, q + 25))}
                      className="w-8 h-8 rounded-lg border border-stone-300 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg" onClick={handleAddToCart} className="w-full">
                    Add to Cart
                  </Button>
                  <Button size="lg" onClick={handleBuyNow} className="w-full" icon={<Lock className="w-4 h-4" />}>
                    Buy Now with Escrow
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Section: Supply Journey, Traceability, AI Report */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          <div className="flex items-center gap-4 border-b border-stone-200 pb-3 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-[#125534] text-[#125534]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Supply Journey
            </button>
            <button
              onClick={() => setActiveTab('traceability')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'traceability'
                  ? 'border-[#125534] text-[#125534]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Source Traceability
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'grading'
                  ? 'border-[#125534] text-[#125534]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              AI Optical Inspection Report
            </button>
          </div>

          {/* TAB 1: SUPPLY JOURNEY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-stone-900">Verifiable Agricultural Journey</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  End-to-end milestone tracking from the initial harvesting mandal through farm hub grading to buyer delivery.
                </p>
              </div>

              {/* Journey Stepper */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {journeySteps.map((j, i) => (
                  <div key={i} className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
                        Stage 0{i + 1}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        {j.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-stone-900 text-xs">{j.title}</h4>
                    <p className="text-[11px] text-stone-600 leading-snug">{j.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TRACEABILITY */}
          {activeTab === 'traceability' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-stone-900">Farm Plot & Batch Traceability</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Every lot can be traced back to its geo-tagged survey numbers and soil health analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">Constituent Farmers</span>
                  <p className="text-xl font-mono font-bold text-stone-900">
                    {product.traceability.constituentFarmersCount} Farmer(s) Aggregated
                  </p>
                  <p className="text-stone-500">
                    Aggregated together to meet commercial crate standards while preserving smallholder fair payout equity.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">Farm Survey Plot ID</span>
                  <div className="space-y-1 font-mono text-stone-800">
                    {product.traceability.farmPlots.map((plot, i) => (
                      <div key={i} className="bg-white px-2 py-1 rounded border border-stone-200 font-semibold">
                        {plot}
                      </div>
                    ))}
                  </div>
                  <p className="text-stone-500">Registered with AP AgriLand Registry.</p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">Soil & Agronomy Health</span>
                  <p className="font-bold text-[#125534]">
                    {product.traceability.soilHealthScore}
                  </p>
                  <p className="text-stone-500">
                    Zero hazardous pesticide residue recorded in rapid chemical strip test at hub intake.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI OPTICAL REPORT */}
          {activeTab === 'grading' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-stone-900">Computer Vision Inspection Log</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Automated defect detection and surface quality evaluation performed on hub arrival.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-stone-500 block text-[11px]">Assigned Grade</span>
                  <span className="text-xl font-bold font-mono text-emerald-900">{product.grade}</span>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block text-[11px]">Quality Score</span>
                  <span className="text-xl font-bold font-mono text-stone-900">{product.qualityScore} / 100</span>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block text-[11px]">Confidence Level</span>
                  <span className="text-xl font-bold font-mono text-stone-900">{product.aiGradingReport.confidence}%</span>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 block text-[11px]">Defect Level</span>
                  <span className="text-xl font-bold font-mono text-stone-900">{product.aiGradingReport.defectLevel}</span>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Inspection Timestamp:</span>
                  <span className="font-mono text-stone-800">{product.aiGradingReport.analyzedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Recommended Spot Price Range:</span>
                  <span className="font-mono font-bold text-emerald-800">{product.aiGradingReport.estimatedMarketPrice}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
