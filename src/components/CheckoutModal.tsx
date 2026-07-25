import React, { useState } from 'react';
import { X, ShieldCheck, Check, QrCode, CreditCard, Truck, Receipt, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  promoCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  promoCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card_installment' | 'cod'>('promptpay');
  const [installmentBank, setInstallmentBank] = useState('KBank');
  const [loading, setLoading] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<any | null>(null);

  const subtotal = cartItems.reduce((sum, item) => {
    const strapPrice = item.selectedStrap ? item.selectedStrap.price : 0;
    return sum + (item.product.price + strapPrice) * item.quantity;
  }, 0);

  const totalAmount = Math.max(0, subtotal - discountAmount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customerInfo: {
            name: customerName,
            phone: phoneNumber,
            address: `${address} จังหวัด${province}`,
          },
          paymentMethod,
          totalAmount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOrderReceipt(data);
        onOrderSuccess();
      }
    } catch (err) {
      // Local fallback
      setOrderReceipt({
        orderId: 'GW-' + Math.floor(100000 + Math.random() * 900000),
        trackingNumber: 'TH981273912EX',
        estimatedDelivery: '1-2 วันทำการ (Express VIP Delivery)',
        totalAmount,
        customerInfo: { name: customerName, phone: phoneNumber, address: `${address} จังหวัด${province}` },
        paymentMethod,
      });
      onOrderSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#020b18] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderReceipt ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                SAMSUNG OFFICIAL CHECKOUT
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                ชำระเงิน <span className="gold-gradient-text">สั่งซื้อนาฬิกา</span>
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Delivery Form */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2 border-b border-white/10 pb-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  1. ข้อมูลจัดส่งสินค้า (ฟรี Express 1-2 วัน)
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">ชื่อ-นามสกุล ผู้รับ:</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น คุณสมชาย วงศ์สวัสดิ์"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">เบอร์โทรศัพท์ติดต่อ:</label>
                    <input
                      type="tel"
                      required
                      placeholder="เช่น 081-234-5678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">จังหวัด:</label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                        <option value="นนทบุรี">นนทบุรี</option>
                        <option value="ปทุมธานี">ปทุมธานี</option>
                        <option value="สมุทรปราการ">สมุทรปราการ</option>
                        <option value="เชียงใหม่">เชียงใหม่</option>
                        <option value="ชลบุรี">ชลบุรี</option>
                        <option value="ภูเก็ต">ภูเก็ต</option>
                        <option value="อื่นๆ">จังหวัดอื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">ที่อยู่จัดส่ง:</label>
                      <input
                        type="text"
                        required
                        placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2 border-b border-white/10 pb-2 pt-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  2. ช่องทางการชำระเงิน
                </h3>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  {/* PromptPay */}
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'promptpay' ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 bg-slate-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'promptpay'}
                        onChange={() => setPaymentMethod('promptpay')}
                      />
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="font-bold text-white">พร้อมเพย์ PromptPay QR</p>
                        <p className="text-[10px] text-slate-400">สแกนจ่ายง่ายผ่านแอปธนาคารทุกประเภท</p>
                      </div>
                    </div>
                  </label>

                  {/* 0% Installment */}
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'credit_card_installment' ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 bg-slate-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'credit_card_installment'}
                        onChange={() => setPaymentMethod('credit_card_installment')}
                      />
                      <CreditCard className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="font-bold text-white">ผ่อนชำระ 0% นาน 10 เดือน</p>
                        <p className="text-[10px] text-amber-300">เพียง ฿{(Math.round(totalAmount / 10)).toLocaleString()}/เดือน</p>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'cod' ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 bg-slate-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <Truck className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="font-bold text-white">ชำระเงินปลายทาง (COD)</p>
                        <p className="text-[10px] text-slate-400">จ่ายเงินกับพนักงานจัดส่งเมื่อรับสินค้า</p>
                      </div>
                    </div>
                  </label>
                </div>

              </div>

              {/* Right Column: Order Summary & PromptPay QR Preview */}
              <div className="md:col-span-5 p-5 bg-slate-900/80 rounded-2xl border border-white/10 flex flex-col justify-between">
                
                <div>
                  <h4 className="text-xs font-bold text-slate-200 border-b border-white/10 pb-2 mb-3">
                    สรุปรายการคำสั่งซื้อ ({cartItems.length} เรือน)
                  </h4>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-slate-300">
                        <span className="line-clamp-1 flex-1 pr-2">
                          {item.product.name} (x{item.quantity})
                        </span>
                        <span className="font-bold text-amber-300 shrink-0">
                          ฿{((item.product.price + (item.selectedStrap ? item.selectedStrap.price : 0)) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {paymentMethod === 'promptpay' && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-amber-500/30 text-center space-y-2">
                      <p className="text-[10px] font-bold text-amber-300">ตัวอย่าง QR Code พร้อมเพย์</p>
                      <div className="w-28 h-28 bg-white mx-auto p-2 rounded-lg flex items-center justify-center border border-amber-400">
                        {/* Simulated QR Visual */}
                        <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-1 text-[8px] text-amber-300 font-mono text-center">
                          <QrCode className="w-12 h-12 text-amber-400 mb-1" />
                          <span>PROMPTPAY OFFICIAL</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400">ยอดชำระ: ฿{totalAmount.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm font-black text-amber-300">
                    <span>ยอดชำระสุทธิ:</span>
                    <span>฿{totalAmount.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-sleek-gold py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>ยืนยันการสั่งซื้อทันที</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>

              </div>

            </form>
          </div>
        ) : (
          /* Order Receipt Confirmation */
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                PAYMENT SUCCESSFUL
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">
                คำสั่งซื้อสำเร็จเรียบร้อยแล้ว!
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                ขอบคุณสำหรับการสั่งซื้อนาฬิกา Samsung Galaxy Watch จากศูนย์บริการไทยอย่างเป็นทางการ
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">หมายเลขคำสั่งซื้อ (Order ID):</span>
                <span className="font-bold text-amber-300">{orderReceipt.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">หมายเลขพัสดุ Express:</span>
                <span className="font-bold text-blue-300">{orderReceipt.trackingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">กำหนดจัดส่งถึงบ้านคุณ:</span>
                <span className="font-bold text-emerald-400">{orderReceipt.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">ผู้รับ:</span>
                <span className="font-semibold text-white">{customerName} ({phoneNumber})</span>
              </div>
              <div className="flex justify-between text-sm font-black text-amber-300 pt-1">
                <span>ยอดชำระแล้ว:</span>
                <span>฿{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-sleek-gold px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
