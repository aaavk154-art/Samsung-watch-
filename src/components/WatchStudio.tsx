import React, { useState } from 'react';
import { Compass, Sparkles, Check, ShoppingBag, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { Product, CustomStrap } from '../types';
import { PRODUCTS, CUSTOM_STRAPS } from '../data/products';

interface WatchStudioProps {
  onAddToCartCustom: (product: Product, strap: CustomStrap) => void;
}

export const WatchStudio: React.FC<WatchStudioProps> = ({ onAddToCartCustom }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedStrap, setSelectedStrap] = useState<CustomStrap>(CUSTOM_STRAPS[0]);
  const [added, setAdded] = useState(false);

  const totalPrice = selectedProduct.price + selectedStrap.price;

  const handleAddToCart = () => {
    onAddToCartCustom(selectedProduct, selectedStrap);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="studio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-b border-white/10 my-10">
      
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3 h-3 animate-spin" />
          GALAXY WATCH DESIGN STUDIO 360°
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          ปรับแต่งนาฬิกา <span className="gold-gradient-text">ในแบบคุณ</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
          แมตช์ตัวเรือนระดับพรีเมียมคู่กับสายนาฬิกาดีไซน์พิเศษ สร้างสไตล์ที่เป็นเอกลักษณ์ของคุณก่อนสั่งซื้อ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#020b18]/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        
        {/* Left Column: Live Interactive Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-950/20 via-slate-950 to-[#020b18] rounded-2xl border border-white/5 relative min-h-[400px]">
          
          {/* Subtle Ambient Studio Circle */}
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-blue-500/5 absolute flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-amber-500/10 animate-ping opacity-20" style={{ animationDuration: '4s' }} />
          </div>

          {/* Watch Body & Strap Visual Composite */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Selected Combo Badges */}
            <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
              <span className="bg-slate-900/90 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                ตัวเรือน: {selectedProduct.name}
              </span>
              <span className="bg-slate-900/90 text-blue-300 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full">
                สาย: {selectedStrap.name}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 text-center">
            * ภาพแสดงการแมตช์สินค้าจริง สินค้าจะถูกจัดส่งพร้อมกล่องเฉพาะตัวเรือนและสายที่คุณเลือก
          </p>
        </div>

        {/* Right Column: Customizer Selector Tools */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step 1: Choose Watch Case */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                1. เลือกตัวเรือนนาฬิกา
              </span>
              <span className="text-xs font-bold text-slate-300">
                ฿{selectedProduct.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                    selectedProduct.id === prod.id
                      ? 'border-amber-400 bg-amber-500/15 text-white shadow-md'
                      : 'border-white/10 bg-slate-900/80 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div>
                    <p className="font-bold text-white">{prod.name}</p>
                    <p className="text-[10px] text-slate-400">{prod.specs.caseMaterial}</p>
                  </div>
                  <span className="font-extrabold text-amber-300">฿{prod.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Custom Strap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                2. เลือกสายนาฬิกาแมตช์พิเศษ
              </span>
              <span className="text-xs font-bold text-slate-300">
                ฿{selectedStrap.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {CUSTOM_STRAPS.map((strap) => (
                <button
                  key={strap.id}
                  onClick={() => setSelectedStrap(strap)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                    selectedStrap.id === strap.id
                      ? 'border-amber-400 bg-amber-500/15 text-white shadow-md'
                      : 'border-white/10 bg-slate-900/80 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: strap.colorHex }} />
                    <div>
                      <p className="font-bold text-white">{strap.name}</p>
                      <p className="text-[10px] text-slate-400">{strap.material}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-amber-300">฿{strap.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Total Combination Calculation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>ราคารวมชุดนาฬิกา + สาย custom:</span>
              <span className="text-xl font-black text-amber-300">฿{totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-amber-400/80">
              ผ่อน 0% 10 เดือน ฿{(Math.round(totalPrice / 10)).toLocaleString()}/เดือน
            </p>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                added ? 'bg-emerald-500 text-slate-950' : 'btn-sleek-gold'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>เพิ่มเซตสั่งแต่งลงตะกร้าแล้ว</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>สั่งซื้อชุดแต่งเซตนี้ (฿{totalPrice.toLocaleString()})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
