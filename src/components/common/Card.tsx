import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'md',
  ...props
}) => {
  const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={`bg-white border border-stone-200/80 rounded-xl shadow-xs ${
        hoverEffect ? 'hover:border-stone-300 hover:shadow-md transition-all duration-200' : ''
      } ${paddingMap[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changePositive = true,
  subtext,
  icon,
  badge,
}) => {
  return (
    <Card hoverEffect className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-700">{label}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-mono">
            {value}
          </p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#125534] shrink-0">
            {icon}
          </div>
        )}
      </div>

      {(change || subtext || badge) && (
        <div className="mt-4 flex items-center gap-2 pt-3 border-t border-stone-100 text-xs">
          {change && (
            <span
              className={`font-semibold inline-flex items-center gap-0.5 ${
                changePositive ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {changePositive ? '↑' : '↓'} {change}
            </span>
          )}
          {subtext && <span className="text-stone-700">{subtext}</span>}
          {badge && (
            <span className="ml-auto bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[11px] font-medium">
              {badge}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
