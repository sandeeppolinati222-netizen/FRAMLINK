import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, ArrowRight, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, addProduct, selectedLanguage, setSelectedLanguage } = useApp();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [transcript, setTranscript] = useState('');
  const [parsedData, setParsedData] = useState<{
    crop: string;
    quantityKg: number;
    pricePerKg: number;
    hub: string;
    grade: 'Grade A';
  }>({
    crop: 'Tomato (Roma Hybrid)',
    quantityKg: 300,
    pricePerKg: 30,
    hub: 'Rajahmundry Farm Hub',
    grade: 'Grade A',
  });
  const [audioWaves, setAudioWaves] = useState([30, 60, 45, 90, 75, 40, 60, 80, 50, 70, 85, 40]);

  // Audio wave animation when listening
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setAudioWaves(prev => prev.map(() => Math.floor(20 + Math.random() * 80)));
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleSimulateTelugu = () => {
    setIsListening(true);
    setTranscript('రైతు: "నా దగ్గర 300 కిలోల టమాటాలు ఉన్నాయి..."');
    setTimeout(() => {
      setIsListening(false);
      setCurrentStep(2);
      setTranscript('సిస్టమ్: "లభించిన సమాచారం: టమాటా, 300 కిలోలు. మీ ఆశించిన ధర ఎంత?" (Expected price per kg?)');
    }, 1800);
  };

  const handleSimulateTeluguPrice = () => {
    setIsListening(true);
    setTranscript('రైతు: "కిలోకి 30 రూపాయలు." (30 rupees per kg)');
    setTimeout(() => {
      setIsListening(false);
      setCurrentStep(3);
    }, 1500);
  };

  const handleSimulateEnglish = () => {
    setIsListening(true);
    setTranscript('Farmer: "I have 300 kg of fresh Grade A Tomatoes ready for collection..."');
    setTimeout(() => {
      setIsListening(false);
      setCurrentStep(2);
      setTranscript('System: "Recognized: 300 kg Tomato. What is your expected price per kg?"');
    }, 1800);
  };

  const handleSimulateEnglishPrice = () => {
    setIsListening(true);
    setTranscript('Farmer: "30 rupees per kg, deliver to Rajahmundry Hub."');
    setTimeout(() => {
      setIsListening(false);
      setCurrentStep(3);
    }, 1500);
  };

  const handleCreateListingFromVoice = () => {
    const newId = addProduct({
      cropName: parsedData.crop,
      category: 'Vegetables',
      variety: 'Roma Hybrid',
      farmerId: 'farmer-ravi',
      farmerName: 'Ravi Kumar',
      farmerLocation: 'Kadiyam Village',
      hubId: 'hub-rajahmundry',
      hubName: parsedData.hub,
      distanceKm: 8.4,
      quantityKg: parsedData.quantityKg,
      minOrderKg: 25,
      pricePerKg: parsedData.pricePerKg,
      grade: parsedData.grade,
      qualityScore: 91,
      harvestDate: new Date().toISOString().split('T')[0],
      expiryDays: 9,
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      verified: true,
      organic: false,
      description: 'Voice-listed farm fresh produce aggregated directly through Rajahmundry Farm Hub.',
      aiGradingReport: {
        cropDetected: 'Tomato (Solanum lycopersicum)',
        grade: 'Grade A',
        qualityScore: 91,
        defectLevel: 'Low',
        confidence: 89,
        estimatedMarketPrice: '₹28 – ₹32 / kg',
        moistureContent: '93.2%',
        firmnessIndex: '4.8 / 5.0',
        analyzedAt: 'Just now (Voice Assistant Flow)',
      },
      traceability: {
        constituentFarmersCount: 1,
        farmPlots: ['Plot #412 Kadiyam Mandal'],
        soilHealthScore: 'Grade A',
        inspectionDate: 'Scheduled on Hub Arrival',
        inspectorName: 'Hub Intake Scanner',
        dispatchReady: true,
      },
    });

    setIsVoiceAssistantOpen(false);
    resetState();
    navigate(`/marketplace/${newId}`);
  };

  const resetState = () => {
    setCurrentStep(1);
    setTranscript('');
    setIsListening(false);
  };

  return (
    <Modal
      isOpen={isVoiceAssistantOpen}
      onClose={() => {
        setIsVoiceAssistantOpen(false);
        resetState();
      }}
      title="🌾 Regional Kisan Voice Assistant"
      subtitle="Speak in your native dialect. AI understands agricultural terms and creates market listings automatically."
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Language selector bar */}
        <div className="flex items-center justify-between bg-stone-50 border border-stone-200 p-2 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-stone-700">
            <Languages className="w-4 h-4 text-emerald-700" />
            <span>Voice Language:</span>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada'].map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#125534] text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {lang} {lang !== 'Telugu' && lang !== 'English' && <span className="text-[10px] opacity-60">(Beta)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Visualizer Stage */}
        <div className="bg-[#081c14] text-white rounded-2xl p-6 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[11px] font-mono text-emerald-400">
            <Volume2 className="w-3.5 h-3.5" /> Noise Cancellation Active
          </div>

          <p className="text-xs text-stone-400 uppercase tracking-wider mb-4 font-mono">
            {isListening ? 'Listening to voice stream...' : 'Microphone Ready — Tap below to speak'}
          </p>

          {/* Waveform graphic */}
          <div className="flex items-center justify-center gap-1.5 h-16 mb-5">
            {audioWaves.map((height, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-100 ${
                  isListening ? 'bg-emerald-400' : 'bg-stone-700'
                }`}
                style={{ height: `${isListening ? height : 12}%` }}
              />
            ))}
          </div>

          {/* Mic Trigger */}
          <button
            onClick={() => {
              if (currentStep === 1) {
                selectedLanguage === 'Telugu' ? handleSimulateTelugu() : handleSimulateEnglish();
              } else if (currentStep === 2) {
                selectedLanguage === 'Telugu' ? handleSimulateTeluguPrice() : handleSimulateEnglishPrice();
              }
            }}
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all transform active:scale-95 shadow-lg ${
              isListening
                ? 'bg-rose-600 animate-pulse text-white ring-4 ring-rose-600/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-4 ring-emerald-600/30'
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          {transcript && (
            <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl text-left font-mono text-xs text-emerald-300 leading-relaxed">
              {transcript}
            </div>
          )}
        </div>

        {/* Quick Simulation Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">
            One-Click Voice Test Demonstrations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleSimulateTelugu}
              className="p-3 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-left transition-all"
            >
              <div className="text-xs font-bold text-[#125534]">Telugu Prompt (తెలుగు)</div>
              <div className="text-xs text-stone-600 mt-1 font-sans">
                "నా దగ్గర 300 కిలోల టమాటాలు ఉన్నాయి."
              </div>
            </button>

            <button
              onClick={handleSimulateEnglish}
              className="p-3 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-left transition-all"
            >
              <div className="text-xs font-bold text-[#125534]">English Prompt</div>
              <div className="text-xs text-stone-600 mt-1">
                "I have 300 kg tomatoes at ₹30/kg."
              </div>
            </button>
          </div>
        </div>

        {/* Parsed Structure & Confirmation Step */}
        {currentStep === 3 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>AI Speech Entity Extraction Complete</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-emerald-100 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Crop Detected</span>
                <span className="font-bold text-stone-900">{parsedData.crop}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Quantity</span>
                <span className="font-bold font-mono text-stone-900">{parsedData.quantityKg} kg</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Expected Price</span>
                <span className="font-bold font-mono text-stone-900">₹{parsedData.pricePerKg} / kg</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Designated Hub</span>
                <span className="font-bold text-stone-900">{parsedData.hub}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={resetState}>
                Re-record Voice
              </Button>
              <Button
                size="sm"
                onClick={handleCreateListingFromVoice}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Create Listing & Publish to Hub
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
