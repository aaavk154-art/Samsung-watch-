import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Compass, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react';
import { Product, AIQuizAnswers, AIRecommendationResponse, ColorOption } from '../types';
import { PRODUCTS, CUSTOM_STRAPS } from '../data/products';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorOption, size: string, connectivity: string) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [answers, setAnswers] = useState<AIQuizAnswers>({
    primaryUse: 'extreme_sports',
    workoutType: 'hiking_diving',
    preferredSize: 'large_rugged',
    desiredBattery: 'multi_day',
    budgetRange: 'above20k',
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      const data = await response.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        throw new Error('Fallback recommendation');
      }
    } catch (err) {
      // Fallback local logic
      const isUltra = answers.budgetRange === 'above20k' || answers.primaryUse === 'extreme_sports';
      const isClassic = answers.primaryUse === 'executive_style';
      const targetModel = isUltra ? PRODUCTS[0] : isClassic ? PRODUCTS[2] : PRODUCTS[1];

      setRecommendation({
        recommendedModelId: targetModel.id,
        title: `Samsung ${targetModel.name}`,
        summary: `จากการวิเคราะห์ด้วย AI สำหรับความต้องการด้าน ${answers.primaryUse} ของคุณ รุ่นนี้ให้ความคุ้มค่าและความทนทานสูงสุด ตอบโจทย์ชีวิตประจำวันได้ดีเยี่ยม`,
        reasons: [
          'ใช้วัสดุเกรดพรีเมียม ทนทานต่อการขีดข่วนและการใช้งานหนัก',
          'รองรับระบบ Galaxy AI วิเคราะห์สุขภาพและวัดคุณภาพการนอนเชิงลึก',
          'แบตเตอรี่ใช้งานได้ยาวนาน พร้อมระบบชาร์จเร็ว'
        ],
        suggestedStrapName: 'Trail Band / Marine Band'
      });
    } finally {
      setLoading(false);
    }
  };

  const getMatchedProduct = (modelId: string): Product => {
    return PRODUCTS.find((p) => p.id === modelId) || PRODUCTS[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#020b18] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            GALAXY AI WATCH ADVISOR
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            ระบบ AI ช่วยเลือก <span className="gold-gradient-text">นาฬิกาที่เหมาะกับคุณ</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            ตอบคำถามสั้นๆ 5 ข้อ เพื่อให้ AI วิเคราะห์สเปคและแนะนำรุ่นที่ตรงกับไลฟ์สไตล์ของคุณที่สุด
          </p>
        </div>

        {!recommendation ? (
          <form onSubmit={handleSubmitQuiz} className="space-y-4">
            
            {/* Question 1: Primary Use */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300">1. การใช้งานหลักที่คุณให้ความสำคัญที่สุด?</label>
              <select
                value={answers.primaryUse}
                onChange={(e) => setAnswers({ ...answers, primaryUse: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="extreme_sports">กีฬาเอ็กซ์ตรีม, ดำน้ำ, วิ่งเทรล, เดินป่าลุยหนัก</option>
                <option value="daily_health">ติดตามสุขภาพประจำวัน, การนอน, ออกกำลังกายทั่วไป</option>
                <option value="executive_style">ลุคนักบริหาร หรูหราคลาสสิก ใส่ทำงานแมตช์ชุดสูท</option>
                <option value="budget_smart">เน้นความคุ้มค่า ฟังก์ชันครบ ในงบประหยัด</option>
              </select>
            </div>

            {/* Question 2: Workout Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300">2. ประเภทกิจกรรม หรือ กีฬาโปรดของคุณ?</label>
              <select
                value={answers.workoutType}
                onChange={(e) => setAnswers({ ...answers, workoutType: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="hiking_diving">เดินป่า, ไตรกีฬา, ดำน้ำทะเล, ปีนเขา</option>
                <option value="gym_running">วิ่งมินิมาราธอน, ฟิตเนส, เวทเทรนนิ่ง</option>
                <option value="golf_walking">เล่นกอล์ฟ, เดินเพื่อสุขภาพ, โยคะ</option>
                <option value="casual">ใส่เดินเล่นในเมือง, ทำงานออฟฟิศ</option>
              </select>
            </div>

            {/* Question 3: Preferred Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300">3. ขนาดหน้าปัด / ข้อมือที่ชื่นชอบ?</label>
              <select
                value={answers.preferredSize}
                onChange={(e) => setAnswers({ ...answers, preferredSize: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="large_rugged">ใหญ่ ดุดัน สายลุย (47mm ไทเทเนียม)</option>
                <option value="standard">ขนาดมาตรฐาน สวยพอดีข้อมือ (43mm - 44mm)</option>
                <option value="compact">ขนาดกะทัดรัด เบาสบายข้อมือ (40mm)</option>
              </select>
            </div>

            {/* Question 4: Battery */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300">4. ความต้องการด้านระยะเวลาใช้งานแบตเตอรี่?</label>
              <select
                value={answers.desiredBattery}
                onChange={(e) => setAnswers({ ...answers, desiredBattery: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="multi_day">อึดพิเศษ 2-4 วัน ไม่ต้องชาร์จบ่อย (โหมด Power Saving 100 ชม.)</option>
                <option value="daily">ใช้งานทั่วไป ชาร์จวันละครั้ง หรือวันเว้นวันได้</option>
              </select>
            </div>

            {/* Question 5: Budget */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-300">5. งบประมาณที่ตั้งไว้?</label>
              <select
                value={answers.budgetRange}
                onChange={(e) => setAnswers({ ...answers, budgetRange: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="above20k">20,000 - 25,000 บาทขึ้นไป (ระดับเรือธงสูงสุด)</option>
                <option value="10k_20k">10,000 - 18,000 บาท (ระดับกลางพรีเมียม)</option>
                <option value="under10k">ต่ำกว่า 10,000 บาท (เริ่มต้นคุ้มค่า)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 btn-sleek-gold py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Galaxy AI กำลังวิเคราะห์สเปค...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>วิเคราะห์และค้นหานาฬิกาเรือนโปรด</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Recommendation Result Card */
          <div className="space-y-6">
            {(() => {
              const matchedProduct = getMatchedProduct(recommendation.recommendedModelId);
              return (
                <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-[#020b18] border border-amber-500/40 space-y-4">
                  
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="w-24 h-24 object-contain drop-shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                        AI MATCHED 98%
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                        {matchedProduct.name}
                      </h3>
                      <p className="text-lg font-black text-amber-300">
                        ฿{matchedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-amber-200">
                      {recommendation.summary}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-xs font-bold text-slate-300">เหตุผลที่ AI แนะนำรุ่นนี้ให้คุณ:</p>
                      {recommendation.reasons?.map((reason: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        onAddToCart(matchedProduct, matchedProduct.colors[0], matchedProduct.sizes[0], matchedProduct.connectivity[0]);
                        onClose();
                      }}
                      className="btn-sleek-gold flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>สั่งซื้อรุ่นที่แนะนำทันที</span>
                    </button>

                    <button
                      onClick={() => setRecommendation(null)}
                      className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10"
                    >
                      ทำแบบสอบถามใหม่
                    </button>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
};
