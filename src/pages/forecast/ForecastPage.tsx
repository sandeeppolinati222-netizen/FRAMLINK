import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { DEMAND_FORECASTS } from '../../data/mockData';
import { 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ForecastPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#125534] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Machine Learning Time-Series Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Predictive Demand & Price Forecasting
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Empowering farmers to plant and harvest according to anticipated demand rather than suffering distress mandi gluts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/farmer/add">
              <Button size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                List Forecasted Crop
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Overall Regional Demand Growth"
            value="+16.4%"
            subtext="Next 14-day rolling window"
            trend="Peak consumption incoming"
            trendType="positive"
            icon={<TrendingUp className="w-5 h-5 text-emerald-800" />}
          />
          <StatCard
            label="Forecast Confidence Index"
            value="91.2%"
            subtext="Validated across 18 markets"
            icon={<Sparkles className="w-5 h-5 text-blue-700" />}
          />
          <StatCard
            label="Distress Selling Prevented"
            value="100%"
            subtext="Through pre-matched buyer demand"
            trend="Fair Price Guaranteed"
            trendType="positive"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-800" />}
          />
        </div>

        {/* Crop Demand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {DEMAND_FORECASTS.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <h3 className="font-extrabold text-stone-900 text-lg">{f.crop}</h3>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +{f.changePercent}% ({f.priceTrend})
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[11px] text-stone-500 uppercase font-mono tracking-wider block">
                      Forecasted 7-Day Demand
                    </span>
                    <span className="text-3xl font-extrabold font-mono text-stone-900 block mt-1">
                      {f.predictedDemandKg.toLocaleString()} kg
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      Current Supply: <strong>{f.currentSupplyKg.toLocaleString()} kg</strong>
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-900 font-semibold block">
                      Recommended Farmer Spot Price
                    </span>
                    <span className="text-xl font-bold font-mono text-[#125534] block mt-0.5">
                      {f.currentPriceRange}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-stone-700">Demand Acceleration Factors:</span>
                    <ul className="space-y-1 text-stone-600">
                      {f.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100">
                <Link to="/farmer/add">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    List {f.crop} Lot Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
