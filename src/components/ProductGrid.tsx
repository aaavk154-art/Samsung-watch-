import React, { useState } from 'react';
import { Product, WatchCategory, ColorOption, CustomStrap } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { CUSTOM_STRAPS } from '../data/products';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string, connectivity: string) => void;
  onAddStrapToCart: (strap: CustomStrap) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onAddStrapToCart,
  searchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<WatchCategory>('all');
  const [addedStrapId, setAddedStrapId] = useState<string | null>(null);

  const categories: { id: WatchCategory; label: string; badge?: string }[] = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'ultra', label: 'Galaxy Watch Ultra', badge: '10ATM ไทเทเนียม' },
    { id: 'watch7', label: 'Galaxy Watch7', badge: 'ชิป 3nm AI' },
    { id: 'classic', label: 'Watch6 Classic', badge: 'ขอบหมุนได้' },
    { id: 'fe', label: 'Watch FE', badge: 'คุ้มค่าสุด' },
    { id: 'straps', label: 'สายนาฬิกาพรีเมียม' },
  ];

  // Filter products by category & search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || activeCategory === 'straps' || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddStrap = (strap: CustomStrap) => {
    onAddStrapToCart(strap);
    setAddedStrapId(strap.id);
    setTimeout(() => setAddedStrapId(null), 1500);
  };

  return (
    <section id="collection" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[3px] font-bold text-amber-400 block mb-1">
            SAMSUNG GALAXY WATCH COLLECTION 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            คอลเลกชันนาฬิกาอัจฉริยะ <span className="gold-gradient-text">รุ่นยอดนิยม</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            เลือกสมาร์ทวอทช์เรือนโปรดที่ตอบโจทย์กิจกรรมและสุขภาพของคุณพร้อมโปรโมชั่นพิเศษ
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-white'
              }`}
            >
              {cat.label}
              {cat.badge && (
                <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded bg-slate-950/40 text-amber-200">
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      {activeCategory !== 'straps' ? (
        filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm">ไม่พบนาฬิกาที่ตรงกับคำค้นหา "{searchQuery}"</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-4 py-2 text-xs font-bold text-amber-300 bg-amber-500/10 rounded-full border border-amber-500/30"
            >
              ดูสินค้าทั้งหมด
            </button>
          </div>
        )
      ) : (
        /* Straps Showcase Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUSTOM_STRAPS.map((strap) => (
            <div key={strap.id} className="sleek-glass-card rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-4 border border-white/5">
                  <img
                    src={strap.image}
                    alt={strap.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: strap.colorHex }} />
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{strap.colorName}</span>
                </div>
                <h3 className="text-base font-bold text-white">{strap.name}</h3>
                <p className="text-slate-400 text-xs mt-1">{strap.material}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-amber-300">฿{strap.price.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-500">รวมภาษีมูลค่าเพิ่มแล้ว</p>
                </div>

                <button
                  onClick={() => handleAddStrap(strap)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    addedStrapId === strap.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'btn-sleek-gold'
                  }`}
                >
                  {addedStrapId === strap.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>เพิ่มแล้ว</span>
                    </>
                  ) : (
                    <span>สั่งซื้อสายนี้</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
