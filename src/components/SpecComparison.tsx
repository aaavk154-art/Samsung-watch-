import React from 'react';
import { Scale, Check, Minus, ShieldCheck, Zap, Compass, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const SpecComparison: React.FC = () => {
  return (
    <section id="compare" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[3px] text-amber-400 block mb-1">
          SPECS COMPARISON MATRIX
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          เปรียบเทียบสเปค <span className="gold-gradient-text">GALAXY WATCH ทุกรุ่น</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          เลือกเรือนที่ใช่สำหรับคุณ เปรียบเทียบวัสดุ แบตเตอรี่ เซนเซอร์สุขภาพ และระดับการกันน้ำ
        </p>
      </div>

      {/* Matrix Table Responsive Scroll */}
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl shadow-2xl p-2 sm:p-6">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-slate-400 w-1/5">
                ฟีเจอร์ / สเปค
              </th>
              {PRODUCTS.map((prod) => (
                <th key={prod.id} className="p-4 text-center w-1/5">
                  <div className="flex flex-col items-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-contain mb-2 drop-shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-white line-clamp-1">{prod.name}</span>
                    <span className="text-sm font-extrabold text-amber-300 mt-1">
                      ฿{prod.price.toLocaleString()}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            
            {/* Case Material */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">วัสดุตัวเรือน</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-slate-200">
                  {p.specs.caseMaterial}
                </td>
              ))}
            </tr>

            {/* Glass */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">กระจกหน้าปัด</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-slate-200">
                  {p.specs.glass}
                </td>
              ))}
            </tr>

            {/* Processor */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">ชิปประมวลผล</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-slate-200">
                  {p.specs.processor}
                </td>
              ))}
            </tr>

            {/* Water Resistance */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">ระดับกันน้ำ</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center font-bold text-emerald-400">
                  {p.specs.waterResistance}
                </td>
              ))}
            </tr>

            {/* Battery */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">แบตเตอรี่ & โหมดประหยัด</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-slate-200">
                  {p.specs.battery}
                </td>
              ))}
            </tr>

            {/* GPS */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">ระบบนำทาง GPS</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center text-slate-200">
                  {p.specs.gps}
                </td>
              ))}
            </tr>

            {/* Galaxy AI Features */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">รองรับ Galaxy AI</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  {p.category === 'ultra' || p.category === 'watch7' ? (
                    <span className="inline-flex items-center gap-1 text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      <Check className="w-3.5 h-3.5" /> รองรับเต็มรูปแบบ
                    </span>
                  ) : (
                    <span className="text-slate-500">ฟีเจอร์พื้นฐาน</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Physical Bezel */}
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-amber-400 uppercase tracking-wider">ขอบหมุนหมุนได้จริง</td>
              {PRODUCTS.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  {p.category === 'classic' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <Check className="w-4 h-4" /> มี (Physical Bezel)
                    </span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </section>
  );
};
