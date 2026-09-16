import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { ImpactStats } from '../components/landing/ImpactStats';
import { HowItWorks } from '../components/landing/HowItWorks';
import { HubNetworkMap } from '../components/landing/HubNetworkMap';
import { AIFeaturesSection } from '../components/landing/AIFeaturesSection';
import { VoiceSection } from '../components/landing/VoiceSection';
import { BulkMatchingDemo } from '../components/landing/BulkMatchingDemo';
import { Footer } from '../components/landing/Footer';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Building2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  // Preview first 3 or 4 products on the marketplace
  const previewProducts = products.slice(0, 4);

  const handleBuyNow = (product: any) => {
    addToCart(product, product.minOrderKg || 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust / Impact Section */}
      <ImpactStats />

      {/* 3. How It Works (5-Step Process) */}
      <HowItWorks />

      {/* 4. Farm Hub Network Visualization (Village A, B, C, D -> Hub -> Marketplace) */}
      <HubNetworkMap />

      {/* 5. AI Capabilities (Grading, Forecasting, Price Guidance) */}
      <AIFeaturesSection />

      {/* 6. Regional Voice Assistant Demonstration */}
      <VoiceSection />

      {/* 7. Marketplace Preview Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#125534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Live Physical Stock
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
                Marketplace Preview
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Direct produce from verified farmers ready for immediate pickup or cold delivery.
              </p>
            </div>

            <Link to="/marketplace">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                View All {products.length} Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>

          {/* Hub Verified Quality Guarantee Banner */}
          <div className="mt-12 bg-stone-50 border border-stone-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e3022] text-white flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Every crate is checked at the local hub</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  100% digital weigh-bridge calibration, moisture index testing, and optical defect grading before release.
                </p>
              </div>
            </div>
            <Link to="/marketplace" className="shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-xs" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
                Enter Marketplace
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Bulk Buyer & Multi-Farmer Supply Matching Demonstration */}
      <BulkMatchingDemo />

      {/* 9. Final Landing Page CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40 text-center border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#125534] flex items-center justify-center mx-auto mb-5 font-bold text-xl">
            🌾
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Build a Fairer Agricultural Supply Chain.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Connect farmers, hubs and buyers through one intelligent network. Transparent prices, zero middleman exploitation, guaranteed escrow payouts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link to="/farmer/add">
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Join the Network
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" size="lg">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <Footer />

    </div>
  );
};
