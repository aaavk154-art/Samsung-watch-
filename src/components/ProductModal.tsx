import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, Sparkles, Zap, Compass, Info, Heart } from 'lucide-react';
import { Product, ColorOption, CustomStrap } from '../types';
import { CUSTOM_STRAPS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColor: ColorOption,
    selectedSize: string,
    selectedConnectivity: string,
    selectedStrap?: CustomStrap
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>(product.connectivity[0]);
  const [selectedStrap, setSelectedStrap] = useState<CustomStrap | undefined>(undefined);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs'>('highlights');

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, selectedConnectivity, selectedStrap);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#020b18] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column - Gallery & Visuals */}
          <div className="lg:col-span-6 p-6 bg-slate-900/50 border-r border-white/10 flex flex-col justify-between">
            <div>
              {/* Main Preview Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-950/30 to-slate-950/90 p-6 flex items-center justify-center mb-4 border border-white/5">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.7)] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-3 left-3 bg-slate-950/80 border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {product.series}
                </span>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-950 ${
                      activeImage === imgUrl ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Warranty Badge */}
            <div className="mt-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-amber-300">การันตีประกันศูนย์ไทย Samsung 2 ปี</p>
                <p className="text-slate-400 text-[11px]">เปลี่ยนเครื่องใหม่ภายใน 7 วันหากมีปัญหาจากการผลิต</p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Configurator */}
          <div className="lg:col-span-6 p-6 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Title & Tagline */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    SAMSUNG OFFICIAL
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating} ({product.reviewCount} รีวิว)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{product.name}</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{product.tagline}</p>
              </div>

              {/* Price Tag */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-amber-300">฿{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-500 line-through ml-2">฿{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">มีสินค้าพร้อมส่ง</span>
                  <p className="text-[10px] text-slate-400">ผ่อน 0% 10 เดือน ฿{(Math.round(product.price / 10)).toLocaleString()}/ด.</p>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex justify-between">
                  <span>เลือกสีตัวเรือน:</span>
                  <span className="text-amber-300 font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                        selectedColor.id === color.id
                          ? 'border-amber-400 bg-amber-500/20 text-white shadow'
                          : 'border-white/10 bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex justify-between">
                  <span>ขนาดตัวเรือน:</span>
                  <span className="text-amber-300 font-normal">{selectedSize}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-amber-400 bg-amber-500 text-slate-950 shadow'
                          : 'border-white/10 bg-slate-900 text-slate-300 hover:border-amber-400/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connectivity Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 flex justify-between">
                  <span>การเชื่อมต่อ:</span>
                  <span className="text-amber-300 font-normal">{selectedConnectivity}</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.connectivity.map((conn) => (
                    <button
                      key={conn}
                      onClick={() => setSelectedConnectivity(conn)}
                      className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                        selectedConnectivity === conn
                          ? 'border-amber-400 bg-amber-500/15 text-amber-200'
                          : 'border-white/10 bg-slate-900 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span>{conn}</span>
                      {selectedConnectivity === conn && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs & Highlights Toggle */}
              <div className="pt-2">
                <div className="flex border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('highlights')}
                    className={`pb-2 px-3 text-xs font-bold border-b-2 transition-colors ${
                      activeTab === 'highlights' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400'
                    }`}
                  >
                    จุดเด่นสำคัญ
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 px-3 text-xs font-bold border-b-2 transition-colors ${
                      activeTab === 'specs' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400'
                    }`}
                  >
                    สเปคอย่างละเอียด
                  </button>
                </div>

                <div className="pt-3 text-xs text-slate-300 space-y-1.5 max-h-36 overflow-y-auto pr-2">
                  {activeTab === 'highlights' ? (
                    product.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      <p><strong className="text-amber-300">ชิปประมวลผล:</strong> {product.specs.processor}</p>
                      <p><strong className="text-amber-300">ตัวเรือน:</strong> {product.specs.caseMaterial}</p>
                      <p><strong className="text-amber-300">หน้าจอ:</strong> {product.specs.glass}</p>
                      <p><strong className="text-amber-300">แบตเตอรี่:</strong> {product.specs.battery}</p>
                      <p><strong className="text-amber-300">การกันน้ำ:</strong> {product.specs.waterResistance}</p>
                      <p><strong className="text-amber-300">GPS:</strong> {product.specs.gps}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-sleek-gold flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>เพิ่มลงตะกร้าสินค้า (฿{product.price.toLocaleString()})</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
