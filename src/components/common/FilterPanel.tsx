import React from 'react';
import { Button } from './Button';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  grades: string[];
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  maxPrice: number;
  priceLimit: number;
  onPriceChange: (val: number) => void;
  verifiedOnly: boolean;
  onToggleVerified: () => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  grades,
  selectedGrade,
  onSelectGrade,
  maxPrice,
  priceLimit,
  onPriceChange,
  verifiedOnly,
  onToggleVerified,
  onReset,
}) => {
  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs space-y-5 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 font-bold text-stone-900">
          <Filter className="w-4 h-4 text-emerald-800" />
          <span>Filter Produce</span>
        </div>
        <button
          onClick={onReset}
          className="text-stone-700 hover:text-stone-900 flex items-center gap-1 text-[11px] font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px] block mb-2">
          Crop Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-all ${
                selectedCategory === cat
                  ? 'bg-[#125534] text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Grade Filter */}
      <div className="pt-3 border-t border-stone-100">
        <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px] block mb-2">
          Quality Grade
        </label>
        <div className="flex flex-wrap gap-1.5">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => onSelectGrade(g)}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                selectedGrade === g
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Price Limit Slider */}
      <div className="pt-3 border-t border-stone-100">
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
            Max Price / kg
          </label>
          <span className="font-mono font-bold text-emerald-800 text-xs">
            ₹{priceLimit}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max={maxPrice}
          step="5"
          value={priceLimit}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[#125534] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-stone-700 mt-1">
          <span>₹10</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      {/* Verified toggle */}
      <div className="pt-3 border-t border-stone-100">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={onToggleVerified}
            className="w-4 h-4 rounded text-[#125534] focus:ring-[#125534] accent-[#125534] cursor-pointer"
          />
          <span className="text-stone-700 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Hub Verified Only
          </span>
        </label>
      </div>
    </div>
  );
};
