import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_LIST } from '../data/products';

export const Footer: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <footer id="warranty" className="bg-[#01060e] border-t border-white/10 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[3px] text-amber-400 block mb-1">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              คำถามที่พบบ่อย <span className="gold-gradient-text">เกี่ยวกับการสั่งซื้อ</span>
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex justify-between items-center gap-4 hover:text-amber-300"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">ประกันศูนย์ไทย 2 ปี</p>
              <p className="text-[10px] text-slate-400">เปลี่ยนเครื่องใหม่ใน 7 วัน</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">ผ่อน 0% นาน 10 เดือน</p>
              <p className="text-[10px] text-slate-400">ร่วมกับบัตรเครดิตชั้นนำ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">ส่งด่วนฟรีทั่วไทย</p>
              <p className="text-[10px] text-slate-400">ถึงมือใน 1-2 วันทำการ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">บริการลูกค้า VIP Call Center</p>
              <p className="text-[10px] text-slate-400">1282 (เปิดบริการ 24 ชม.)</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs pt-8 border-t border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-[2px] text-lg text-white uppercase">
                GALAXY <span className="text-amber-400 font-extrabold">ULTRA</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ร้านค้าจำหน่ายนาฬิกาอัจฉริยะ Samsung Galaxy Watch อย่างเป็นทางการประจำประเทศไทย สัมผัสความหรูหราระดับไฮเอนด์และนวัตกรรม Galaxy AI
            </p>
            <p className="text-[11px] text-amber-300 font-semibold">
              Samsung Thailand Experience Store - Central World Branch & Online Direct
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-extrabold uppercase text-amber-400 tracking-wider">รุ่นสินค้ายอดนิยม</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Samsung Galaxy Watch Ultra (Titanium)</li>
              <li>Samsung Galaxy Watch7 (Cream Gold)</li>
              <li>Samsung Galaxy Watch6 Classic (Rotating Bezel)</li>
              <li>Samsung Galaxy Watch FE (Fan Edition)</li>
              <li>สายนาฬิกา Trail Band & Marine Band</li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="font-extrabold uppercase text-amber-400 tracking-wider">ศูนย์บริการและการติดต่อ</h4>
            <p className="text-slate-400">
              บริษัท ไทยซัมซุง อิเลคโทรนิคส์ จำกัด <br />
              อาคารเอ็มไพร์ทาวเวอร์ ชั้น 33 ถนนสาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120
            </p>
            <p className="text-slate-400">
              <strong>อีเมล:</strong> support@samsung-galaxywatch.th <br />
              <strong>โทรศัพท์:</strong> 02-689-3232 / Call Center 1282
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 Samsung Thailand. All rights reserved. Powered by Galaxy AI.</p>
          <div className="flex gap-4">
            <span>เงื่อนไขการรับประกัน</span>
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>นโยบายการคืนสินค้า</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
