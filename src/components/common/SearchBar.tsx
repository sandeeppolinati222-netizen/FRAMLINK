import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search crops, hubs, farmers, batch IDs...',
  onClear,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#125534]/30 focus:border-[#125534] transition-all"
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-3 text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-100"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

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
    <div className="bg-white border border-stone-200/80 rounded-xl p-5 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-[#125534]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-stone-500 hover:text-[#125534] font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2.5">
          Produce Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#125534] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Grade */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2.5">
          AI Quality Grade
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left border transition-all ${
                selectedGrade === grade
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Max Price / kg
          </label>
          <span className="text-xs font-mono font-bold text-stone-800">
            ₹{priceLimit}/kg
          </span>
        </div>
        <input
          type="range"
          min="10"
          max={maxPrice}
          step="5"
          value={priceLimit}
          onChange={e => onPriceChange(Number(e.target.value))}
          className="w-full accent-[#125534] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
          <span>₹10</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      {/* Verification Filter */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={onToggleVerified}
            className="w-4 h-4 rounded text-[#125534] focus:ring-[#125534] accent-[#125534]"
          />
          <span className="text-xs font-medium text-stone-700">Hub Verified & Tested Only</span>
        </label>
      </div>
    </div>
  );
};
