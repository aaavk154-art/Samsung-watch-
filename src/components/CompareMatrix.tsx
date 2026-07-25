import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Check, Minus, Sparkles, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface CompareMatrixProps {
  onAddToCart: (product: Product) => void;
  selectedCompareIds?: string[];
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({ onAddToCart, selectedCompareIds = [] }) => {
  const [activeProducts, setActiveProducts] = useState<Product[]>(PRODUCTS);

  const toggleModelVisibility = (prod: Product) => {
    if (activeProducts.some((p) => p.id === prod.id)) {
      if (activeProducts.length > 2) {
        setActiveProducts(activeProducts.filter((p) => p.id !== prod.id));
      }
    } else {
      setActiveProducts([...activeProducts, prod]);
    }
  };

  return (
    <section id="compare" className="py-16 bg-slate-950 border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>SPEC COMPARISON MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            เปรียบเทียบสเปค Samsung Galaxy Watch ทุกซีรีส์
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            ค้นหารุ่นที่ตอบโจทย์ไลฟ์สไตล์ การออกกำลังกาย และงบประมาณของคุณได้ชัดเจนที่สุด
          </p>

          {/* Model Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {PRODUCTS.map((prod) => {
              const isSelected = activeProducts.some((p) => p.id === prod.id);
              return (
                <button
                  key={prod.id}
                  onClick={() => toggleModelVisibility(prod)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md'
                      : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '} {prod.series}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-2xl shadow-2xl">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 sm:p-5 w-48 text-amber-300 font-bold uppercase tracking-wider sticky left-0 bg-slate-950 z-10 border-r border-slate-800">
                  คุณสมบัติ / สเปค
                </th>
                {activeProducts.map((prod) => (
                  <th key={prod.id} className="p-4 sm:p-5 text-center min-w-[180px] border-r border-slate-800/60 last:border-0">
                    <div className="flex flex-col items-center space-y-2">
                      <img src={prod.image} alt={prod.name} className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
                      <span className="font-bold text-white text-sm line-clamp-1">{prod.series}</span>
                      <span className="text-amber-300 font-extrabold text-sm">฿{prod.price.toLocaleString()}</span>
                      <button
                        onClick={() => onAddToCart(prod)}
                        className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg shadow transition-all active:scale-95"
                      >
                        สั่งซื้อรุ่นนี้
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {/* Row 1: Case Material */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  วัสดุตัวเรือน
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    <span className={p.category === 'ultra' ? 'text-amber-300 font-bold' : ''}>
                      {p.specs.caseMaterial}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 2: Display Glass */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  กระจกหน้าจอ
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    {p.specs.glass}
                  </td>
                ))}
              </tr>

              {/* Row 3: Processor */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  ชิปประมวลผล
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    <span className={p.specs.processor.includes('3nm') ? 'text-emerald-400 font-bold' : ''}>
                      {p.specs.processor}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 4: Water Resistance */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  การกันน้ำ / มาตรฐานดำน้ำ
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    <span className={p.specs.waterResistance.includes('10ATM') ? 'text-amber-300 font-bold' : ''}>
                      {p.specs.waterResistance}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 5: GPS */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  ระบบนำทาง GPS
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    {p.specs.gps}
                  </td>
                ))}
              </tr>

              {/* Row 6: Galaxy AI Features */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  ฟังก์ชัน Galaxy AI & เซนเซอร์
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    <ul className="space-y-1 text-[11px] text-slate-300 text-left">
                      {p.specs.sensors.map((s, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 7: Battery Life */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  ขนาดแบตเตอรี่
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    {p.specs.battery}
                  </td>
                ))}
              </tr>

              {/* Row 8: Weight */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-slate-200 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  น้ำหนักตัวเรือน
                </td>
                {activeProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-r border-slate-800/60 last:border-0">
                    {p.specs.weight}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
