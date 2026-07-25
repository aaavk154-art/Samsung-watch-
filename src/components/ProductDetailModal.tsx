import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Sparkles, Cpu, Battery, Gauge, Droplet, Radio } from 'lucide-react';
import { Product, ColorOption } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: ColorOption, selectedSize: string, selectedConnectivity: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>(product.connectivity[0]);
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs'>('highlights');
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, selectedConnectivity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Gallery */}
            <div className="p-6 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 flex items-center justify-center p-4">
                <img
                  src={product.gallery[activeImageIndex] || product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Official Studio Render
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900 ${
                      activeImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Details & Options */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  {product.series}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">รีวิวจากผู้ใช้จริง ({product.reviewCount} ราย)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-amber-300">
                      ฿{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ฿{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-400 mt-0.5">
                    ✨ ผ่อน 0% นาน 10 เดือน เพียง ฿{(product.price / 10).toLocaleString()}/เดือน
                  </p>
                </div>
              </div>

              {/* Options Selection */}
              <div className="space-y-4">
                
                {/* Color Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    เลือกสีตัวเรือน ({selectedColor.name}):
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                          selectedColor.id === color.id
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-600"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    ขนาดตัวเรือน:
                  </label>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connectivity */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    การเชื่อมต่อ:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.connectivity.map((conn) => (
                      <button
                        key={conn}
                        onClick={() => setSelectedConnectivity(conn)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedConnectivity === conn
                            ? 'bg-blue-600/30 text-blue-300 border-blue-400 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {conn}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Tabs: Highlights vs Specs */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex border-b border-slate-800 gap-4">
                  <button
                    onClick={() => setActiveTab('highlights')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'highlights'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    จุดเด่นผลิตภัณฑ์
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 text-xs font-bold border-b-2 transition-all ${
                      activeTab === 'specs'
                        ? 'border-amber-400 text-amber-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    สเปคอย่างละเอียด
                  </button>
                </div>

                {activeTab === 'highlights' ? (
                  <ul className="space-y-2 text-xs text-slate-300">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800">
                      <span className="text-slate-400">วัสดุ:</span>
                      <span className="col-span-2 font-medium">{product.specs.caseMaterial}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800">
                      <span className="text-slate-400">หน้าจอ:</span>
                      <span className="col-span-2 font-medium">{product.specs.glass}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800">
                      <span className="text-slate-400">ชิปประมวลผล:</span>
                      <span className="col-span-2 font-medium">{product.specs.processor}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-800">
                      <span className="text-slate-400">แบตเตอรี่:</span>
                      <span className="col-span-2 font-medium">{product.specs.battery}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1">
                      <span className="text-slate-400">การกันน้ำ:</span>
                      <span className="col-span-2 font-medium">{product.specs.waterResistance}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98 ${
                    added
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400 shadow-amber-500/20'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>เพิ่มลงตะกร้าเรียบร้อยแล้ว</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>ใส่ตะกร้า (฿{product.price.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
