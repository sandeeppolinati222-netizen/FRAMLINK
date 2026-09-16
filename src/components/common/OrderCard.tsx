import React from 'react';
import { Order } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { Truck, MapPin, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderCardProps {
  order: Order;
  onAdvanceStatus?: (orderId: string, nextStatus: Order['status']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onAdvanceStatus }) => {
  const getNextStatus = (current: Order['status']): Order['status'] | null => {
    switch (current) {
      case 'Order Created': return 'Produce Aggregated';
      case 'Produce Aggregated': return 'Quality Verified';
      case 'Quality Verified': return 'Packed';
      case 'Packed': return 'Dispatched';
      case 'Dispatched': return 'Out for Delivery';
      case 'Out for Delivery': return 'Delivered';
      default: return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs hover:border-stone-300 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#125534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              {order.id}
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {order.createdAt}
            </span>
          </div>
          <h4 className="font-bold text-stone-900 text-base mt-1">{order.productName}</h4>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={order.status} />
          {order.escrow?.status && <StatusBadge status={order.escrow.status} size="sm" />}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs text-stone-600 border-b border-stone-100">
        <div>
          <span className="text-stone-400 block text-[11px]">Quantity</span>
          <span className="font-mono font-bold text-stone-900">{(order.quantityKg ?? 0).toLocaleString()} kg</span>
        </div>
        <div>
          <span className="text-stone-400 block text-[11px]">Total Value</span>
          <span className="font-mono font-bold text-stone-900">₹{(order.totalAmount ?? 0).toLocaleString('en-IN')}</span>
        </div>
        <div>
          <span className="text-stone-400 block text-[11px]">Farm Hub</span>
          <span className="font-medium text-stone-800 truncate block">{order.hubName}</span>
        </div>
        <div>
          <span className="text-stone-400 block text-[11px]">Buyer</span>
          <span className="font-medium text-stone-800 truncate block">{order.buyerName}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="truncate">ETA: <strong className="text-stone-900">{order.estimatedDelivery}</strong></span>
          {order.tempControlled && (
            <span className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold">
              ❄ {order.currentTempC}°C Cold Chain
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/logistics?orderId=${order.id}`}>
            <Button variant="outline" size="sm">
              Track Route
            </Button>
          </Link>
          <Link to={`/payments?orderId=${order.id}`}>
            <Button variant="secondary" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              Escrow Details
            </Button>
          </Link>
          {nextStatus && onAdvanceStatus && (
            <Button
              size="sm"
              onClick={() => onAdvanceStatus(order.id, nextStatus)}
              className="text-xs"
            >
              Advance to {nextStatus}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
