import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, createOrderFromCart } = useApp();
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState('FreshMart Logistics DC');
  const [buyerPhone, setBuyerPhone] = useState('+91 99887 76655');
  const [deliveryAddress, setDeliveryAddress] = useState('Plot 44, Logistics Park, Ring Road, Vijayawada');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.pricePerKg * item.quantityKg, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantityKg, 0);

  const farmerPayout = Math.round(totalAmount * 0.86);
  const hubFee = Math.round(totalAmount * 0.08);
  const logisticsFee = Math.round(totalAmount * 0.04);
  const platformFee = Math.round(totalAmount * 0.02);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = createOrderFromCart({
        name: buyerName,
        phone: buyerPhone,
        address: deliveryAddress,
      });
      setIsSubmitting(false);
      setOrderSuccessId(orderId);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Direct Procurement Cart</h3>
              <p className="text-xs text-stone-500">Secured with Smart Escrow Guarantee</p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {orderSuccessId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-stone-900">Order Confirmed & Locked!</h4>
                  <p className="text-xs text-stone-500 font-mono mt-1">Order ID: {orderSuccessId}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 text-left space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Lock className="w-3.5 h-3.5" /> ₹{totalAmount.toLocaleString('en-IN')} Held in Escrow
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Funds will remain securely held until produce is delivered, quality verified, and signed off at your facility.
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setOrderSuccessId(null);
                      setIsCartOpen(false);
                      navigate(`/logistics?orderId=${orderSuccessId}`);
                    }}
                  >
                    Track Live Logistics Route
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOrderSuccessId(null);
                      setIsCartOpen(false);
                      navigate('/payments');
                    }}
                  >
                    View Escrow Breakdown
                  </Button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-2">
                <p className="text-sm">Your procurement cart is empty.</p>
                <p className="text-xs">Browse the smart marketplace to order graded produce.</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.cropName}
                        className="w-14 h-14 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.cropName}</h4>
                        <p className="text-[11px] text-stone-500">
                          {item.quantityKg} kg × ₹{item.product.pricePerKg}/kg
                        </p>
                        <p className="text-[10px] text-emerald-700 font-medium">{item.product.hubName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold font-mono text-stone-900">
                          ₹{(((item.product?.pricePerKg ?? 0) * (item.quantityKg ?? 0)) || 0).toLocaleString('en-IN')}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 mt-1 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Escrow Transparency Breakdown */}
                <div className="bg-[#125534]/5 border border-[#125534]/20 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#125534]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Transparent Escrow Allocation</span>
                  </div>
                  <div className="text-xs space-y-1.5 pt-1 text-stone-600">
                    <div className="flex justify-between">
                      <span>Direct Farmer Payout (86%)</span>
                      <span className="font-mono font-semibold text-stone-900">₹{farmerPayout.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Farm Hub Aggregation & Grading (8%)</span>
                      <span className="font-mono font-semibold text-stone-900">₹{hubFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cold Logistics & Route Transit (4%)</span>
                      <span className="font-mono font-semibold text-stone-900">₹{logisticsFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Smart Network Escrow Fee (2%)</span>
                      <span className="font-mono font-semibold text-stone-900">₹{platformFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900 text-sm">
                      <span>Total Buyer Payment</span>
                      <span className="font-mono text-[#125534]">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information Form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Delivery Information</h4>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Company / Buyer Name</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#125534]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Contact Phone</label>
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={e => setBuyerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#125534]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Delivery Destination</label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#125534]"
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="w-full mt-4"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Lock Payment in Escrow & Order
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
