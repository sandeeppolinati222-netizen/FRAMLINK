import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, X, ExternalLink, Sparkles, Building2, Package, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearAllNotifications } = useApp();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Sparkles className="w-3.5 h-3.5 text-emerald-600" />;
      case 'hub': return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'order': return <Package className="w-3.5 h-3.5 text-amber-600" />;
      case 'payment': return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />;
      default: return <Bell className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white border border-stone-200 rounded-xl shadow-xl z-50 overflow-hidden">
        <div className="p-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-stone-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Notifications</h4>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={clearAllNotifications}
              className="text-[11px] text-stone-500 hover:text-emerald-800 font-medium px-1.5 py-0.5 rounded hover:bg-stone-100"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-stone-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-400">
              No new notifications.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`p-3.5 text-left transition-colors flex items-start gap-3 ${
                  n.read ? 'bg-white opacity-80' : 'bg-emerald-50/30'
                }`}
                onClick={() => markNotificationRead(n.id)}
              >
                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(n.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs font-bold ${n.read ? 'text-stone-700' : 'text-stone-900'}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{n.message}</p>
                  {n.linkTo && (
                    <Link
                      to={n.linkTo}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#125534] mt-1.5 hover:underline"
                    >
                      View Details <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
