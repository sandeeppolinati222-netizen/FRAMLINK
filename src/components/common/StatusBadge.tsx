import React from 'react';

type BadgeType = 
  | 'Grade A' 
  | 'Grade B' 
  | 'Grade C' 
  | 'Received' 
  | 'Weighing' 
  | 'Grading' 
  | 'Approved' 
  | 'Aggregated' 
  | 'Packed' 
  | 'Dispatched' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Payment Received' 
  | 'Held Securely' 
  | 'Payment Released' 
  | 'Verified' 
  | 'Organic'
  | 'Open'
  | 'Matched'
  | 'Under Review'
  | 'Resolved'
  | string;

interface StatusBadgeProps {
  status: BadgeType;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'Grade A':
      case 'Verified':
      case 'Approved':
      case 'Delivered':
      case 'Payment Released':
      case 'Resolved':
      case 'Matched':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Organic':
      case 'Premium Organic':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Grade B':
      case 'Aggregated':
      case 'Packed':
      case 'Dispatched':
      case 'Out for Delivery':
      case 'Held Securely':
      case 'Weighing':
      case 'Grading':
        return 'bg-blue-50 text-blue-800 border-blue-200/80';
      case 'Grade C':
      case 'Received':
      case 'Open':
      case 'Under Review':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Rejected':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full whitespace-nowrap ${getStyles()} ${sizeClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};
