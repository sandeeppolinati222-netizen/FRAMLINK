import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Sparkles, UploadCloud, TrendingUp, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { DEMAND_FORECASTS } from '../../data/mockData';

export const AIFeaturesSection: React.FC = () => {
  // Interactive Crop Grading State
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const sampleImages = [
    {
      name: 'Tomato (Roma Hybrid)',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      grade: 'Grade A',
      score: 91,
      confidence: 89,
      defect: 'Low (0.8% surface speckling)',
      colorUniformity: '94%',
      estPrice: '₹28 – ₹32 / kg',
    },
    {
      name: 'Onion (Nasik Dark Red)',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
      grade: 'Grade A',
      score: 93,
      confidence: 91,
      defect: 'Low (Zero sprouting)',
      colorUniformity: '96%',
      estPrice: '₹33 – ₹36 / kg',
    },
    {
      name: 'Table Potato (Jyoti)',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
      grade: 'Grade B',
      score: 84,
      confidence: 88,
      defect: 'Moderate (Minor soil scuff)',
      colorUniformity: '87%',
      estPrice: '₹20 – ₹24 / kg',
    },
  ];

  const currentCrop = sampleImages[selectedCropIndex];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FBFBFA] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#125534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Machine Learning in Agritech
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-3">
            AI That Helps Every Step of the Supply Chain
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Objective computer vision, predictive time-series demand models, and automated market price guidance designed specifically for regional Indian agriculture.
          </p>
          <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
            <span>AI outputs are real-time algorithmic estimates & recommendations verified by hub supervisors.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Feature 1: AI Crop Grading */}
          <Card className="flex flex-col justify-between" hoverEffect>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#125534] flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">AI Crop Grading</h3>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Vision Model
                </span>
              </div>

              {/* Interactive sample switcher */}
              <div className="flex gap-1.5 mb-3">
                {sampleImages.map((img, idx) => (
                  <button
                    key={img.name}
                    onClick={() => setSelectedCropIndex(idx)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      selectedCropIndex === idx
                        ? 'bg-[#125534] text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {img.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Crop image preview with scan effect */}
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-stone-200 bg-stone-900">
                <img
                  src={currentCrop.image}
                  alt={currentCrop.name}
                  className="w-full h-full object-cover opacity-90"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] animate-pulse" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  Live Scanner Frame: 1080p
                </div>
              </div>

              {/* Result Diagnostics */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Detected Crop:</span>
                  <span className="font-bold text-stone-900">{currentCrop.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Quality Grade:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                    {currentCrop.grade}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Quality Score:</span>
                  <span className="font-mono font-bold text-stone-900">{currentCrop.score}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Confidence:</span>
                  <span className="font-mono font-semibold text-stone-700">{currentCrop.confidence}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Defect Level:</span>
                  <span className="font-medium text-stone-800">{currentCrop.defect}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={handleSimulateScan}
                loading={isScanning}
                icon={<UploadCloud className="w-3.5 h-3.5" />}
              >
                Re-Analyze Crop Sample
              </Button>
            </div>
          </Card>

          {/* Feature 2: Demand Forecasting */}
          <Card className="flex flex-col justify-between" hoverEffect>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">Demand Forecasting</h3>
                </div>
                <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  Predictive Model
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80">
                  <div className="text-xs text-blue-900 font-semibold mb-1">
                    Tomato Demand Next Week
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-stone-900">
                    3,500 kg
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-1">
                    <span>↑ +18% expected demand surge</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-stone-700">Forecast Driving Factors:</div>
                  <ul className="space-y-1.5 text-stone-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Upcoming wedding season in Vijayawada & Guntur (+22%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Monsoon arrival in Karnataka delaying external supply</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>High restaurant and bulk procurement contracts signed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 bg-stone-50 -mx-6 -mb-6 p-4 rounded-b-xl text-[11px] text-stone-500">
              * Based on historical consumption trends, local festive calendars, and weather models.
            </div>
          </Card>

          {/* Feature 3: Smart Price Assistance */}
          <Card className="flex flex-col justify-between" hoverEffect>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">Smart Price Assistance</h3>
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  Dynamic Pricing
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                  <div className="text-xs text-amber-950 font-semibold mb-1">
                    Current Regional Supply Available
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-stone-900">
                    2,850 kg
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Aggregated across 3 farm hubs within 25km corridor
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <span className="text-xs text-emerald-900 font-semibold block mb-1">
                    Recommended Price Range (Grade A)
                  </span>
                  <div className="text-2xl font-bold font-mono text-[#125534]">
                    ₹28 – ₹32 <span className="text-xs font-sans font-normal text-emerald-800">/ kg</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                    Farmer receives 86% directly (₹24.1 – ₹27.5 / kg) vs traditional APMC middleman take of only ₹14 / kg.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Fair Trade Index:</span>
                <span className="font-bold text-emerald-700 font-mono">98.2 / 100</span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};
