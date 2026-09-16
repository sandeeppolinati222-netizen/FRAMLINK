import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarProps {
  title: string;
  subtitle?: string;
  items: SidebarItem[];
  extraBottom?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  subtitle,
  items,
  extraBottom,
}) => {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-stone-200/80 min-h-[calc(100vh-65px)] flex flex-col justify-between p-4 hidden md:flex">
      <div>
        <div className="px-3 py-2 mb-4 border-b border-stone-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">{title}</h2>
          {subtitle && <p className="text-xs font-medium text-stone-700 mt-0.5">{subtitle}</p>}
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#125534] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {extraBottom && (
        <div className="pt-4 border-t border-stone-100">
          {extraBottom}
        </div>
      )}
    </aside>
  );
};
