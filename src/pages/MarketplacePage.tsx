import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/common/SearchBar';
import { FilterPanel } from '../components/common/FilterPanel';
import { ProductCard } from '../components/common/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { LayoutGrid, List, Sparkles, Filter } from 'lucide-react';
import { ProductListing, CropCategory } from '../types';

export const MarketplacePage: React.FC = () => {
  const { products, addToCart } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [priceLimit, setPriceLimit] = useState(250);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices'];
  const grades = ['All', 'Grade A', 'Grade B'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.cropName.toLowerCase().includes(q);
        const matchesFarmer = p.farmerName.toLowerCase().includes(q);
        const matchesHub = p.hubName.toLowerCase().includes(q);
        const matchesVariety = p.variety.toLowerCase().includes(q);
        if (!matchesName && !matchesFarmer && !matchesHub && !matchesVariety) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Grade
      if (selectedGrade !== 'All' && p.grade !== selectedGrade) {
        return false;
      }

      // Price
      if (p.pricePerKg > priceLimit) {
        return false;
      }

      // Verified only
      if (verifiedOnly && !p.verified) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedGrade, priceLimit, verifiedOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedGrade('All');
    setPriceLimit(250);
    setVerifiedOnly(false);
  };

  const handleBuyNow = (product: ProductListing) => {
    addToCart(product, product.minOrderKg || 50);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Header */}
        <div className="pb-6 border-b border-stone-200/80 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#125534] bg-emerald-50 px-2.5 py-1 rounded-md mb-2 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> AI Quality-Graded Physical Stock
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Smart Spot Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Direct procurement from farmer batches aggregated across East Godavari, Krishna & Kakinada Farm Hubs.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white p-2 border border-stone-200 rounded-xl shadow-xs text-xs">
            <div className="px-3 border-r border-stone-200">
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Available Supply</span>
              <span className="font-bold text-stone-900 font-mono">
                {products.reduce((acc, p) => acc + p.quantityKg, 0).toLocaleString()} kg
              </span>
            </div>
            <div className="px-3">
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Verified Batches</span>
              <span className="font-bold text-[#125534] font-mono">{products.length} Lots</span>
            </div>
          </div>
        </div>

        {/* Main Layout: Filters on Left, Products on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              grades={grades}
              selectedGrade={selectedGrade}
              onSelectGrade={setSelectedGrade}
              maxPrice={250}
              priceLimit={priceLimit}
              onPriceChange={setPriceLimit}
              verifiedOnly={verifiedOnly}
              onToggleVerified={() => setVerifiedOnly(!verifiedOnly)}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product Listing Area */}
          <div className="lg:col-span-9 space-y-5">
            
            {/* Control Bar: Search + View Mode Switcher + Mobile Filter Toggle */}
            <div className="bg-white border border-stone-200/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex-1 min-w-[200px]">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by crop, farmer, hub or variety..."
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  <Filter className="w-3.5 h-3.5 text-stone-500" />
                  <span>Filters</span>
                </button>

                {/* View Switcher: Grid vs List */}
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="Grid View"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="List View"
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
              <div className="lg:hidden mb-4">
                <FilterPanel
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  grades={grades}
                  selectedGrade={selectedGrade}
                  onSelectGrade={setSelectedGrade}
                  maxPrice={250}
                  priceLimit={priceLimit}
                  onPriceChange={setPriceLimit}
                  verifiedOnly={verifiedOnly}
                  onToggleVerified={() => setVerifiedOnly(!verifiedOnly)}
                  onReset={handleResetFilters}
                />
              </div>
            )}

            {/* Products Container */}
            {filteredProducts.length === 0 ? (
              <EmptyState
                title="No produce found matching your criteria"
                description="Try broadening your category filter or adjusting the maximum price slider."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    layout="grid"
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    layout="list"
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
