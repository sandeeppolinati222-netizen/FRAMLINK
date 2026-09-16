import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Sparkles, 
  UploadCloud, 
  Building2, 
  Calendar, 
  DollarSign, 
  Scale, 
  CheckCircle2, 
  ArrowLeft,
  Camera,
  Layers,
  AlertCircle
} from 'lucide-react';
import { MOCK_HUBS } from '../../data/mockData';
import { CropCategory, QualityGrade } from '../../types';

export const AddProducePage: React.FC = () => {
  const { addProductListing, addNotification } = useApp();
  const navigate = useNavigate();

  // Form State
  const [cropName, setCropName] = useState('Tomato');
  const [variety, setVariety] = useState('Roma Hybrid');
  const [category, setCategory] = useState<CropCategory>('Vegetables');
  const [harvestDate, setHarvestDate] = useState('2026-09-16');
  const [quantityKg, setQuantityKg] = useState<number>(400);
  const [expectedPrice, setExpectedPrice] = useState<number>(30);
  const [selectedHubId, setSelectedHubId] = useState<string>(MOCK_HUBS[0].id);
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  );

  // AI Quality Grading simulation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<{
    grade: QualityGrade;
    qualityScore: number;
    confidence: number;
    estimatedPrice: string;
    defectLevel: string;
  } | null>({
    grade: 'Grade A',
    qualityScore: 92,
    confidence: 89,
    estimatedPrice: '₹30 – ₹34 / kg',
    defectLevel: 'Low (0.6% surface spots)',
  });

  const handleAnalyzeQuality = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiReport({
        grade: 'Grade A',
        qualityScore: Math.floor(Math.random() * 6) + 90,
        confidence: 91,
        estimatedPrice: `₹${expectedPrice - 2} – ₹${expectedPrice + 3} / kg`,
        defectLevel: 'Low (Clean skin, optimal ripeness)',
      });
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedHub = MOCK_HUBS.find(h => h.id === selectedHubId) || MOCK_HUBS[0];

    const newProduct = {
      id: `PROD-${Date.now().toString().slice(-4)}`,
      cropName,
      variety,
      category,
      grade: aiReport?.grade || 'Grade A',
      qualityScore: aiReport?.qualityScore || 90,
      pricePerKg: Number(expectedPrice),
      quantityKg: Number(quantityKg),
      minOrderKg: Math.min(50, Number(quantityKg)),
      farmerId: 'FARMER-01',
      farmerName: 'Ravi Kumar',
      farmerLocation: 'Kadiyam, East Godavari',
      hubId: selectedHub.id,
      hubName: selectedHub.name,
      distanceKm: 7.2,
      harvestDate,
      expiryDays: 8,
      verified: true,
      organic: false,
      imageUrl,
      description: `Freshly harvested ${variety} ${cropName}. Graded with automated hub optical camera inspection with ${aiReport?.qualityScore || 92}% rating.`,
      aiGradingReport: {
        analyzedAt: new Date().toLocaleTimeString(),
        confidence: aiReport?.confidence || 89,
        defectLevel: aiReport?.defectLevel || 'Low',
        moistureContent: '88%',
        firmnessIndex: '4.8 kg/cm²',
        estimatedMarketPrice: aiReport?.estimatedPrice || '₹30 – ₹34 / kg',
      },
      traceability: {
        constituentFarmersCount: 1,
        farmPlots: ['AP-EG-KAD-088'],
        soilHealthScore: '94% Organic Nitrogen Rich',
        inspectorName: 'K. Satyanarayana (Hub QC)',
      },
    };

    addProductListing(newProduct);
    addNotification({
      title: 'Produce Listed Successfully',
      message: `${quantityKg} kg ${cropName} assigned to ${selectedHub.name} for aggregation.`,
      type: 'success',
    });

    navigate('/farmer');
  };

  const sampleImages = [
    { label: 'Tomato', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { label: 'Chilli', url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Onion', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Potato', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="mb-6">
          <Link
            to="/farmer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Farmer Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                List Fresh Produce Lot
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                Register harvest for nearest farm hub intake, digital weighing & AI quality grading.
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-[#125534] border border-emerald-200 px-3 py-1 rounded-full font-bold">
              Hub Drop-off Ready
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Basic Harvest Info */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              1. Crop Identification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  placeholder="e.g. Tomato, Chilli, Onion"
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Variety / Cultivar</label>
                <input
                  type="text"
                  required
                  value={variety}
                  onChange={e => setVariety(e.target.value)}
                  placeholder="e.g. Roma Hybrid, Teja, Nasik Red"
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CropCategory)}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains & Cereals</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Harvest Date</label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={e => setHarvestDate(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Volume, Pricing & Hub Destination */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
              2. Quantity & Local Farm Hub
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  min="25"
                  required
                  value={quantityKg}
                  onChange={e => setQuantityKg(Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Expected Price (₹ / kg)</label>
                <input
                  type="number"
                  min="5"
                  required
                  value={expectedPrice}
                  onChange={e => setExpectedPrice(Number(e.target.value))}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nearest Aggregation Hub</label>
                <select
                  value={selectedHubId}
                  onChange={e => setSelectedHubId(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg p-2.5 focus:ring-1 focus:ring-[#125534] focus:outline-none text-xs"
                >
                  {MOCK_HUBS.map(hub => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} ({hub.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculated Gross Estimate */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-600">Expected Total Gross Value:</span>
              <span className="font-mono font-bold text-base text-[#125534]">
                ₹{(quantityKg * expectedPrice).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Section 3: Image Upload & Simulated AI Optical Quality Grading */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                3. AI Crop Quality Grading Inspection
              </h2>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Computer Vision Model
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Select or take a photo of your harvest crate. The AI model checks skin uniformity, ripeness, and surface blemishes to assign an official grade.
            </p>

            {/* Sample Image Picker for convenience */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-stone-700 block">Select Sample or Upload:</span>
              <div className="grid grid-cols-4 gap-2">
                {sampleImages.map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => {
                      setImageUrl(s.url);
                      setCropName(s.label);
                    }}
                    className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all ${
                      imageUrl === s.url ? 'border-[#125534] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-stone-900/80 text-white text-[10px] px-1.5 py-0.2 rounded">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Grading Inspection Console */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-300 shrink-0">
                    <img src={imageUrl} alt="Sample preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Optical Scanner Analysis</span>
                    <span className="text-[11px] text-stone-500">RGB Spectral Color Spectrum & Surface Defect Ratio</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAnalyzeQuality}
                  loading={isAnalyzing}
                  icon={<Sparkles className="w-4 h-4 text-emerald-700" />}
                >
                  Analyze Quality
                </Button>
              </div>

              {/* Display Result required in prompt:
                  Grade A
                  Quality Score: 92%
                  Estimated market price: ₹30–₹34/kg
              */}
              {aiReport && (
                <div className="bg-white border border-emerald-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Assigned Grade</span>
                    <span className="text-base font-bold font-mono text-[#125534]">{aiReport.grade}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Quality Score</span>
                    <span className="text-base font-bold font-mono text-stone-900">{aiReport.qualityScore}%</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Confidence</span>
                    <span className="text-base font-bold font-mono text-stone-900">{aiReport.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Est. Market Price</span>
                    <span className="text-base font-bold font-mono text-emerald-800">{aiReport.estimatedPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link to="/farmer">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg" icon={<CheckCircle2 className="w-4 h-4" />}>
              Publish Produce Lot to Hub
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};
