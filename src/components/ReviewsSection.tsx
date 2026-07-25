import React from 'react';
import { Star, ThumbsUp, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[3px] text-amber-400 block mb-1">
          REAL CUSTOMER EXPERIENCES
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          เสียงตอบรับจาก <span className="gold-gradient-text">ผู้ใช้งานจริง</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          ความประทับใจจากลูกค้าที่สั่งซื้อนาฬิกา Samsung Galaxy Watch จากร้านค้าทางการของเรา
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CUSTOMER_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="sleek-glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Stars & Model */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-medium">{rev.date}</span>
              </div>

              <div>
                <p className="text-xs font-extrabold text-amber-300">{rev.watchModel}</p>
                <h3 className="text-sm font-bold text-white mt-1">"{rev.title}"</h3>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-9 h-9 rounded-full object-cover border border-amber-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    {rev.userName}
                    {rev.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Purchase" />
                    )}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-semibold">ผู้ซื้อที่ยืนยันแล้ว</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                <ThumbsUp className="w-3 h-3 text-amber-400" />
                <span>{rev.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
