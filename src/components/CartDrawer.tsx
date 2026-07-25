import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => {
    const strapPrice = item.selectedStrap ? item.selectedStrap.price : 0;
    return sum + (item.product.price + strapPrice) * item.quantity;
  }, 0);

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');

    if (promoCodeInput.trim().toUpperCase() === 'GALAXYVIP' || promoCodeInput.trim().toUpperCase() === 'ULTRA2026') {
      setAppliedDiscount(1000);
      setAppliedCode(promoCodeInput.trim().toUpperCase());
      setPromoCodeInput('');
    } else {
      setPromoError('รหัสส่วนลดไม่ถูกต้อง ลองใช้รหัส "GALAXYVIP" เพื่อรับส่วนลด ฿1,000');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Background Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#020b18] border-l border-amber-500/30 h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">ตะกร้าสินค้าของคุณ</h2>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
              {cartItems.length} รายการ
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
              <button
                onClick={onClose}
                className="btn-sleek-gold text-xs px-4 py-2 rounded-lg font-bold"
              >
                เลือกซื้อนาฬิกาเลย
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTotal = (item.product.price + (item.selectedStrap ? item.selectedStrap.price : 0)) * item.quantity;
              return (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3 relative group">
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain rounded-lg bg-slate-950 p-1 border border-white/5 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 pr-6">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                      
                      <div className="text-[10px] text-slate-400 space-y-0.5 mt-1">
                        <p>สี: <span className="text-amber-300">{item.selectedColor.name}</span> | ขนาด: <span className="text-amber-300">{item.selectedSize}</span></p>
                        <p>ระบบ: {item.selectedConnectivity}</p>
                        {item.selectedStrap && (
                          <p className="text-blue-300 font-semibold">+ สาย {item.selectedStrap.name} (+฿{item.selectedStrap.price.toLocaleString()})</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    {/* Quantity Adjustment Controls */}
                    <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-amber-300">
                        ฿{itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-slate-900/90 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ใส่คูปองส่วนลด (เช่น GALAXYVIP)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg border border-white/10"
                >
                  ใช้คูปอง
                </button>
              </div>

              {appliedCode && (
                <p className="text-[10px] text-emerald-400 font-semibold">
                  ✓ ใช้คูปอง {appliedCode} สำเร็จ รับส่วนลด ฿1,000
                </p>
              )}
              {promoError && (
                <p className="text-[10px] text-rose-400">{promoError}</p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า:</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>ค่าจัดส่ง Express VIP:</span>
                <span className="font-bold">ฟรี</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>ส่วนลดคูปอง:</span>
                  <span>-฿{appliedDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-amber-300 border-t border-white/10 pt-2 mt-1">
                <span>สุทธิต้องชำระ:</span>
                <span>฿{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(appliedDiscount, appliedCode)}
              className="w-full btn-sleek-gold py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
            >
              <span>ดำเนินการสั่งซื้อชำระเงิน</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
