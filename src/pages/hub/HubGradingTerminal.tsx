import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Building2,
  Camera,
  RefreshCw,
  Scale,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QualityGrade } from '../../types';

export const HubGradingTerminal: React.FC = () => {
  const { hubBatches, verifyHubBatch, addNotification } = useApp();
  const navigate = useNavigate();

  const [selectedBatchId, setSelectedBatchId] = useState<string>(hubBatches[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);

  const selectedBatch = hubBatches.find(b => b.id === selectedBatchId) || hubBatches[0];

  // AI model diagnostic output state
  const [detectedCrop, setDetectedCrop] = useState(selectedBatch.cropName);
  const [grade, setGrade] = useState<QualityGrade>(selectedBatch.assignedGrade || 'Grade A');
  const [qualityScore, setQualityScore] = useState<number>(selectedBatch.qualityScore || 91);
  const [defectDetails, setDefectDetails] = useState('Low blemish ratio (<0.8%), optimal firmness 4.8 kg/cm², zero fungal spores');
  const [recommendedPrice, setRecommendedPrice] = useState('₹28 – ₹32 / kg');

  const handleBatchSelect = (batchId: string) => {
    const batch = hubBatches.find(b => b.id === batchId);
    if (batch) {
      setSelectedBatchId(batchId);
      setDetectedCrop(batch.cropName);
      setGrade(batch.assignedGrade || 'Grade A');
      setQualityScore(batch.qualityScore || 90);
      setHasScanned(Boolean(batch.assignedGrade));
    }
  };

  const handleRunModel = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      setGrade('Grade A');
      setQualityScore(93);
      setDefectDetails('Clean surface skin, optimal fruit symmetry, 0.4% minor mechanical scuffing');
      setRecommendedPrice('₹30 – ₹34 / kg');
    }, 800);
  };

  const handleApproveAndPublish = () => {
    verifyHubBatch(selectedBatchId, grade, qualityScore);
    addNotification({
      title: 'Batch Certified & Published',
      message: `${selectedBatch.id} (${selectedBatch.cropName}) certified as ${grade} (${qualityScore}%) and published to live marketplace.`,
      type: 'success',
    });
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="mb-6">
          <Link
            to="/hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hub Operations
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  Optical QC Terminal 02
                </span>
                <span className="text-xs text-stone-500">• Rajahmundry Farm Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                AI Quality Verification & Certification Terminal
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Vision Sensor Live
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Batches, Right Inspection Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Select Incoming Batch */}
          <div className="lg:col-span-4 bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                1. Select Incoming Batch
              </h3>
              <span className="text-[11px] font-mono text-stone-400">
                {hubBatches.length} Total
              </span>
            </div>

            <div className="space-y-2">
              {hubBatches.map((b) => {
                const isSelected = b.id === selectedBatchId;
                return (
                  <button
                    key={b.id}
                    onClick={() => handleBatchSelect(b.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[#125534] bg-emerald-50/50 shadow-xs ring-1 ring-[#125534]'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-xs text-stone-900">{b.id}</span>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="text-xs font-bold text-stone-900">{b.cropName} • {b.quantityKg} kg</div>
                    <div className="text-[11px] text-stone-500 mt-1 flex justify-between">
                      <span>Farmer: {b.farmerName}</span>
                      <span className="font-mono">{b.intakeTimestamp}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Optical Vision Terminal */}
          <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  2. Optical Multi-Spectral Quality Analysis
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Batch: <strong>{selectedBatch.id}</strong> ({selectedBatch.cropName}) from {selectedBatch.farmerName}
                </p>
              </div>

              <Button
                size="sm"
                onClick={handleRunModel}
                loading={isScanning}
                icon={<Sparkles className="w-4 h-4 text-emerald-300" />}
              >
                {hasScanned ? 'Re-Run AI Model' : 'Run AI Quality Model'}
              </Button>
            </div>

            {/* Visual Feed Stage */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80"
                alt="Optical scanner feed"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Scanning visual overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-600/20 flex flex-col items-center justify-center">
                  <div className="w-full h-1.5 bg-emerald-400 shadow-[0_0_20px_#34d399] animate-bounce" />
                  <span className="text-xs font-mono font-bold text-white bg-stone-900/80 px-3 py-1 rounded-full mt-4">
                    Scanning surface blemishes & chromatic consistency...
                  </span>
                </div>
              )}

              {/* Fixed Diagnostic Overlay markers */}
              <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Station Camera #02 • Macro Zoom 2.4x</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-white/10">
                Resolution: 4K UHD 60FPS
              </div>
            </div>

            {/* Analysis Diagnostics Output */}
            {hasScanned && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Detected Crop</span>
                    <span className="text-base font-bold text-stone-900">{detectedCrop}</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Assigned Grade</span>
                    <span className="text-base font-bold font-mono text-[#125534]">{grade}</span>
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Quality Score</span>
                    <span className="text-base font-bold font-mono text-stone-900">{qualityScore}%</span>
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-stone-400 block text-[10px] uppercase font-mono">Recommended Price</span>
                    <span className="text-base font-bold font-mono text-emerald-800">{recommendedPrice}</span>
                  </div>
                </div>

                {/* Defect Log */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Defect Detection Report</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {defectDetails}
                  </p>
                  <div className="pt-2 border-t border-stone-200/70 flex justify-between text-stone-500 text-[11px]">
                    <span>Standard Reference: AGMARK Grade Specifications 2024</span>
                    <span>Inspector Digital ID: AP-HUB-QC-SATYA</span>
                  </div>
                </div>
              </div>
            )}

            {/* Operator Final Approval Action */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Publishing makes this verified lot immediately purchasable by bulk buyers and consumers.
              </div>

              <Button
                size="lg"
                onClick={handleApproveAndPublish}
                disabled={!hasScanned || selectedBatch.status === 'Verified'}
                icon={<Check className="w-4 h-4" />}
              >
                {selectedBatch.status === 'Verified' ? 'Already Published' : 'Approve & Publish to Marketplace'}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
