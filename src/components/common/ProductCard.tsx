import React from 'react';
import { ProductListing } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { CheckCircle2, MapPin, Building2, Sparkles, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ProductListing;
  onBuyNow?: (product: ProductListing) => void;
  onAddToCart?: (product: ProductListing) => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuyNow,
  onAddToCart,
  layout = 'grid',
}) => {
  if (layout === 'list') {
    return (
      <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-stone-300 hover:shadow-xs transition-all">
        <img
          src={product.imageUrl}
          alt={product.cropName}
          className="w-full sm:w-28 h-28 object-cover rounded-lg shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-stone-900 truncate">{product.cropName}</h3>
            <StatusBadge status={product.grade} size="sm" />
            {product.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Hub Verified
              </span>
            )}
            {product.organic && <StatusBadge status="Organic" size="sm" />}
          </div>

          <p className="text-xs text-stone-500 mb-2">{product.variety} • Source: {product.farmerName}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              <span className="truncate">{product.hubName}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{product.distanceKm} km away</span>
            </div>
            <div className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-semibold text-stone-900">{(product.quantityKg ?? 0).toLocaleString()} kg available</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end justify-between w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
          <div className="text-left sm:text-right mb-2">
            <div className="text-xl font-bold font-mono text-stone-900">
              ₹{product.pricePerKg} <span className="text-xs font-sans font-normal text-stone-500">/ kg</span>
            </div>
            <div className="text-[11px] text-stone-400">Min order: {product.minOrderKg} kg</div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link to={`/marketplace/${product.id}`} className="flex-1 sm:flex-initial">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
            {onBuyNow && (
              <Button size="sm" onClick={() => onBuyNow(product)} className="flex-1 sm:flex-initial">
                Buy Now
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-xs hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Product Image Banner */}
      <div className="relative h-44 overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.cropName}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          <StatusBadge status={product.grade} size="sm" />
          {product.organic && <StatusBadge status="Organic" size="sm" />}
        </div>
        {product.verified && (
          <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified
          </div>
        )}

        {/* AI Score pill */}
        <div className="absolute bottom-2 left-2 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
          AI Score: {product.qualityScore}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="font-bold text-stone-900 text-base leading-snug hover:text-[#125534] transition-colors">
              <Link to={`/marketplace/${product.id}`}>{product.cropName}</Link>
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-3">{product.variety} • Source: {product.farmerName}</p>

          <div className="space-y-1.5 py-2.5 border-y border-stone-100 text-xs text-stone-600 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Farm Hub
              </span>
              <span className="font-medium text-stone-800 text-right truncate max-w-[150px]">{product.hubName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Distance
              </span>
              <span className="font-mono text-stone-700">{product.distanceKm} km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Available
              </span>
              <span className="font-bold text-[#125534] font-mono">{(product.quantityKg ?? 0).toLocaleString()} kg</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-bold font-mono text-stone-900 tracking-tight">
                ₹{product.pricePerKg}
              </span>
              <span className="text-xs text-stone-500 ml-1">/ kg</span>
            </div>
            <span className="text-[11px] text-stone-400">Min: {product.minOrderKg} kg</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/marketplace/${product.id}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Details
              </Button>
            </Link>
            {onBuyNow ? (
              <Button size="sm" onClick={() => onBuyNow(product)} className="w-full text-xs">
                Buy Now
              </Button>
            ) : (
              <Link to={`/marketplace/${product.id}`} className="w-full">
                <Button size="sm" className="w-full text-xs">
                  Buy Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
