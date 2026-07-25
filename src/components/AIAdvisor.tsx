import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Check, ArrowRight, RefreshCw, ShoppingBag, Zap, Heart, ShieldAlert, Award } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AIAdvisorProps {
  onAddToCart: (product: Product) => void;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ onAddToCart }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Form State
  const [primaryUse, setPrimaryUse] = useState<string>('extreme_sports');
  const [workoutType, setWorkoutType] = useState<string>('hiking_diving');
  const [preferredSize, setPreferredSize] = useState<string>('large_rugged');
  const [desiredBattery, setDesiredBattery] = useState<string>('multi_day');
  const [budgetRange, setBudgetRange] = useState<string>('above20k');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // AI Recommendation State
  const [aiResult, setAiResult] = useState<any>(null);

  const handleSubmitQuiz = async () => {
    setLoading(true);
    setStep(2);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryUse,
          workoutType,
          preferredSize,
          desiredBattery,
          budgetRange,
          additionalNotes,
        }),
      });

      const data = await response.json();
      if (data.success && data.recommendation) {
        setAiResult(data.recommendation);
      } else {
        throw new Error('Fallback recommendation');
      }
    } catch (err) {
      console.warn('AI Recommendation fallback:', err);
      // Client-side smart fallback
      const fallbackModelId = budgetRange === 'above20k' ? 'galaxy-watch-ultra' : 'galaxy-watch7-cream';
      setAiResult({
        recommendedModelId: fallbackModelId,
        title: 'Galaxy AI Recommendation',
        summary: 'จากคำตอบของคุณ เราขอแนะนำ Samsung Galaxy Watch รุ่นที่ตอบสนองไลฟ์สไตล์และงบประมาณของคุณได้อย่างดีเยี่ยมที่สุด',
        reasons: [
          'ตรงกับวัตถุประสงค์การใช้งานและกิจกรรมประจำวันของคุณ',
          'รองรับการวัดค่าสุขภาพด้วย Galaxy AI และ BioActive Sensor',
          'ตัวเรือนผลิตจากวัสดุคุณภาพสูง ทนทานสวยงาม'
        ],
        suggestedStrapName: 'Trail Band / Marine Band'
      });
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedProduct = (): Product => {
    if (!aiResult) return PRODUCTS[0];
    const found = PRODUCTS.find((p) => p.id === aiResult.recommendedModelId);
    return found || PRODUCTS[0];
  };

  const recommendedProd = getRecommendedProduct();

  return (
    <section id="ai-advisor" className="py-16 bg-slate-950 border-b border-blue-900/30 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-blue-500/20 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>GALAXY AI SMART ASSISTANT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            ระบบ AI ช่วยเลือกนาฬิกาให้เหมาะกับตัวคุณ
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            วิเคราะห์กิจกรรม รูปร่างข้อมือ และความต้องการสุขภาพเฉพาะบุคคลด้วยปัญญาประดิษฐ์ Gemini
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-slate-900/90 border border-amber-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  ตอบคำถาม 4 ข้อสั้นๆ (1/4)
                </span>
                <span className="text-[11px] text-slate-400">ใช้เวลาไม่เกิน 30 วินาที</span>
              </div>

              {/* Question 1: Primary Use */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  1. กิจกรรมหลักที่คุณเน้นใช้งานคืออะไร?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'extreme_sports', label: 'กีฬาเอ็กซ์ตรีม / ปีนเขา / ดำน้ำลึก', sub: 'ต้องการความอึด ทนทาน 10ATM' },
                    { id: 'daily_health', label: 'ฟิตเนส / วิ่งประจำวัน / วัดสุขภาพ', sub: 'เน้นวัดนอน AGEs และ Energy Score' },
                    { id: 'executive_style', label: 'ทำงาน / ธุรกิจ / ใส่เข้าชุดสูทหรู', sub: 'เน้นดีไซน์คลาสสิกขอบหมุนหรูหรา' },
                    { id: 'budget_smart', label: 'ใช้งานทั่วไป คุ้มค่า คุ้มราคา', sub: 'เน้นแจ้งเตือน วัดชีพจรทั่วไป' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPrimaryUse(item.id)}
                      className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                        primaryUse === item.id
                          ? 'bg-amber-500/20 border-amber-400 text-white font-bold ring-1 ring-amber-400/30'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-white text-xs">{item.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Size & Wrist */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  2. ขนาดเรือนและข้อมือที่คุณชื่นชอบ:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'large_rugged', label: '47mm ดุดัน', desc: 'หน้าจอกว้าง อ่านง่าย' },
                    { id: 'standard', label: '44mm/43mm มาตรฐาน', desc: 'พอดีข้อมือชาย-หญิง' },
                    { id: 'compact', label: '40mm ขนาดกะทัดรัด', desc: 'เบาสบายข้อมือเล็ก' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPreferredSize(s.id)}
                      className={`p-3 rounded-xl border text-center text-xs transition-all ${
                        preferredSize === s.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <p className="font-bold">{s.label}</p>
                      <p className="text-[10px] text-slate-500">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Budget Range */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  3. ช่วงงบประมาณที่คุณวางไว้:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'above20k', label: '฿20,000 ขึ้นไป', desc: 'จัดเต็มเรือนไทเทเนียม' },
                    { id: '10k_20k', label: '฿10,000 - ฿20,000', desc: 'ระดับพรีเมียมยอดฮิต' },
                    { id: 'under10k', label: 'ต่ำกว่า ฿10,000', desc: 'รุ่น Fan Edition คุ้มค่า' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetRange(b.id)}
                      className={`p-3 rounded-xl border text-center text-xs transition-all ${
                        budgetRange === b.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <p className="font-bold">{b.label}</p>
                      <p className="text-[10px] text-slate-500">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>ประมวลผลด้วย Galaxy AI</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              {loading ? (
                <div className="py-16 text-center space-y-4">
                  <div className="inline-block p-4 bg-amber-500/10 rounded-full border border-amber-500/30 animate-spin">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Galaxy AI กำลังวิเคราะห์ข้อมูลสุขภาพและสไตล์ของคุณ...</h3>
                  <p className="text-xs text-slate-400">ประมวลผลด้วยโมเดล Gemini 2.5 Flash เพื่อเลือกสมาร์ทวอทช์ที่แม่นยำที่สุด</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* AI Result Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-300 uppercase">GALAXY AI RECOMMENDATION RESULT</span>
                        <h3 className="text-lg font-bold text-white">{aiResult?.title || 'ผลการวิเคราะห์เฉพาะบุคคล'}</h3>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 border border-slate-800 px-3 py-1.5 rounded-lg"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>ทำแบบทดสอบใหม่</span>
                    </button>
                  </div>

                  {/* Recommendation Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-amber-500/20">
                    {aiResult?.summary}
                  </p>

                  {/* Recommended Watch Display Card */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row items-center gap-6">
                    <img
                      src={recommendedProd.image}
                      alt={recommendedProd.name}
                      className="w-40 h-40 object-contain shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="space-y-3 text-left w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">{recommendedProd.series}</span>
                        <span className="bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/30">
                          MATCH SCORE 98%
                        </span>
                      </div>

                      <h4 className="text-lg font-extrabold text-white">{recommendedProd.name}</h4>

                      {/* Reasons Bullets */}
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {aiResult?.reasons?.map((reason: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400">ราคาพิเศษศูนย์ไทย:</p>
                          <p className="text-xl font-extrabold text-amber-300">฿{recommendedProd.price.toLocaleString()}</p>
                        </div>

                        <button
                          onClick={() => onAddToCart(recommendedProd)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-yellow-400 transition-all active:scale-95"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>ใส่ตะกร้ารุ่นที่ AI แนะนำ</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
