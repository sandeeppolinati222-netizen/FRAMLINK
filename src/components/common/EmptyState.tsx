import React from 'react';
import { Button } from './Button';
import { PackageSearch } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/50">
      <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 text-stone-400 mx-auto flex items-center justify-center mb-3">
        {icon || <PackageSearch className="w-6 h-6 text-stone-400" />}
      </div>
      <h3 className="text-sm font-bold text-stone-900">{title}</h3>
      {description && (
        <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
