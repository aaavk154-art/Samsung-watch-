import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Compass, Zap, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onCustomStudioClick: () => void;
  onAIClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCustomStudioClick,
  onAIClick
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-6 pb-16 lg:py-20 border-b border-blue-900/30">
      {/* Deep Luxury Blue & Amber Light Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-blue-500/10 border border-amber-500/30 backdrop-blur-md px-4 py-1.5 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                THE NEXT REVOLUTION IN LUXURY SMARTWATCHES
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight"
            >
              สัมผัสความหรูหราขั้นสุด <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100">
                Samsung Galaxy Watch Ultra
              </span> <br />
              & Galaxy Watch7 Series
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
            >
              ผสานตัวเรือนไทเทเนียมเกรด 4 ดีไซน์คลาสสิกทรงเสน่ห์ และขีดสุดแห่งนวัตกรรม <span className="text-amber-300 font-semibold">Galaxy AI</span> ติดตามสุขภาพเชิงลึก วัดคุณภาพการนอน พร้อมการรับประกันศูนย์ไทย 2 ปีเต็ม
            </motion.p>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="bg-slate-900/60 border border-blue-900/40 backdrop-blur-md p-3 rounded-xl flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-100">Titanium Grade 4</p>
                  <p className="text-[10px] text-slate-400">แข็งแกร่งทนทานลุยได้ทุกสภาวะ</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-blue-900/40 backdrop-blur-md p-3 rounded-xl flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-100">Exynos 3nm Chip</p>
                  <p className="text-[10px] text-slate-400">เร็วขึ้น 3 เท่า ประหยัดพลังงาน</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-900/60 border border-blue-900/40 backdrop-blur-md p-3 rounded-xl flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-100">10ATM Waterproof</p>
                  <p className="text-[10px] text-slate-400">กันน้ำลึก 100M ดำน้ำได้มั่นใจ</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 group"
              >
                <span>เลือกชมสินค้าทั้งหมด</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomStudioClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-300 font-semibold text-sm border border-amber-500/40 hover:border-amber-400 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Studio แต่งนาฬิกา 360°</span>
              </button>

              <button
                onClick={onAIClick}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-blue-950/60 hover:bg-blue-900/60 text-slate-200 font-medium text-xs border border-blue-800/50 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>ให้ AI แนะนำรุ่นที่เหมาะกับคุณ</span>
              </button>
            </motion.div>

          </div>

          {/* Right Showcase Image Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-amber-400/40 via-blue-800/30 to-amber-600/20 shadow-2xl shadow-blue-950/80"
            >
              <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="Samsung Galaxy Watch Ultra and Watch7 Series"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Glassmorphic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                {/* Floating Highlight Badges */}
                <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur-md border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-amber-300">NEW RELEASE 2026</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-amber-300">SPECIAL OFFER</p>
                      <p className="text-sm font-bold text-white">รับฟรี สาย Trail Band มูลค่า ฿2,490</p>
                      <p className="text-[10px] text-slate-400">เมื่อสั่งซื้อ Galaxy Watch Ultra วันนี้</p>
                    </div>
                    <div className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-lg shadow">
                      ฿23,900
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sub-card floating badge */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-slate-900/90 border border-blue-800/60 backdrop-blur-xl rounded-2xl p-3.5 items-center gap-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Official Samsung Warranty</p>
                <p className="text-[10px] text-slate-400">การันตีเครื่องศูนย์ไทย 100%</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
