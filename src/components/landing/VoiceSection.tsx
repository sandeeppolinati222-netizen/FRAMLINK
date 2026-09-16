import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Mic, Volume2, CheckCircle2, Sparkles, Languages, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceSection: React.FC = () => {
  const { setIsVoiceAssistantOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'telugu' | 'english'>('telugu');

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#125534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Zero Digital Literacy Barrier
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Agriculture Shouldn't Require a Smartphone
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Farmers can interact with the platform using natural voice in regional languages. Even smallholders without literacy can sell directly and verify fair market prices.
            </p>

            {/* Language Badges */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Supported Regional Dialects
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-emerald-100 text-[#125534] px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200">
                  Telugu (తెలుగు) • Active
                </span>
                <span className="bg-emerald-100 text-[#125534] px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200">
                  English • Active
                </span>
                <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-xs font-medium border border-stone-200">
                  Hindi (हिन्दी)
                </span>
                <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-xs font-medium border border-stone-200">
                  Tamil (தமிழ்)
                </span>
                <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-xs font-medium border border-stone-200">
                  Kannada (ಕನ್ನಡ)
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => setIsVoiceAssistantOpen(true)}
                icon={<Mic className="w-4 h-4 text-emerald-300" />}
              >
                Launch Kisan Voice Assistant
              </Button>
            </div>
          </div>

          {/* Right Simulated Interactive Voice Dialog */}
          <div className="lg:col-span-7">
            <div className="bg-[#081c14] border border-stone-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Smart Voice Interaction Engine</h3>
                    <p className="text-[11px] text-emerald-400">Natural Language Entity Extraction</p>
                  </div>
                </div>

                <div className="flex bg-white/10 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setActiveTab('telugu')}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      activeTab === 'telugu' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => setActiveTab('english')}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      activeTab === 'english' ? 'bg-emerald-600 text-white' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Chat Conversation Flow */}
              <div className="space-y-4">
                {activeTab === 'telugu' ? (
                  <>
                    {/* Farmer Speech 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        రైతు
                      </div>
                      <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-3.5 max-w-md text-sm text-stone-100">
                        "నా దగ్గర 300 కిలోల టమాటాలు ఉన్నాయి."
                        <span className="block text-[11px] text-stone-400 mt-1 font-mono">
                          (I have 300 kg tomatoes)
                        </span>
                      </div>
                    </div>

                    {/* System Understanding 1 */}
                    <div className="ml-11 bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Sparkles className="w-3.5 h-3.5" /> AI Entity Extraction:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-stone-300 pt-1 font-mono">
                        <div>Product: <strong className="text-white">Tomato (Roma)</strong></div>
                        <div>Quantity: <strong className="text-white">300 kg</strong></div>
                      </div>
                    </div>

                    {/* System Prompt */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-[#125534] border border-emerald-500/40 rounded-2xl rounded-tr-none p-3.5 max-w-md text-sm text-white">
                        "లభించింది. కిలోకు మీ ఆశించిన ధర ఎంత?"
                        <span className="block text-[11px] text-emerald-200 mt-1 font-mono">
                          (Understood. What is your expected price per kg?)
                        </span>
                      </div>
                    </div>

                    {/* Farmer Speech 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        రైతు
                      </div>
                      <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-3.5 max-w-md text-sm text-stone-100">
                        "కిలోకి 30 రూపాయలు."
                        <span className="block text-[11px] text-stone-400 mt-1 font-mono">
                          (30 rupees per kg)
                        </span>
                      </div>
                    </div>

                    {/* System Final Confirmation */}
                    <div className="p-3.5 bg-emerald-500 text-stone-950 rounded-xl flex items-center justify-between font-medium text-xs font-mono shadow-md">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-stone-950" />
                        <span>లిస్టింగ్ విజయవంతంగా సృష్టించబడింది (Listing Created Successfully)</span>
                      </div>
                      <span className="bg-stone-950 text-white text-[10px] px-2 py-0.5 rounded">
                        Rajahmundry Hub
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        User
                      </div>
                      <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-3.5 max-w-md text-sm text-stone-100">
                        "I have 300 kg tomatoes harvested this morning."
                      </div>
                    </div>

                    <div className="ml-11 bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <Sparkles className="w-3.5 h-3.5" /> AI Entity Extraction:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-stone-300 pt-1 font-mono">
                        <div>Product: <strong className="text-white">Tomato</strong></div>
                        <div>Quantity: <strong className="text-white">300 kg</strong></div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-[#125534] border border-emerald-500/40 rounded-2xl rounded-tr-none p-3.5 max-w-md text-sm text-white">
                        "Recognized 300 kg tomato. What is your expected price per kg?"
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        User
                      </div>
                      <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-3.5 max-w-md text-sm text-stone-100">
                        "30 rupees per kg at Rajahmundry Farm Hub."
                      </div>
                    </div>

                    <div className="p-3.5 bg-emerald-500 text-stone-950 rounded-xl flex items-center justify-between font-medium text-xs font-mono shadow-md">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-stone-950" />
                        <span>Marketplace Listing Generated & Scheduled for Hub Pickup</span>
                      </div>
                      <span className="bg-stone-950 text-white text-[10px] px-2 py-0.5 rounded">
                        ID: #PROD-894
                      </span>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
