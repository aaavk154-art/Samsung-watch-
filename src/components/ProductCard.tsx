import React from 'react';
import { ShoppingBag, Star, Eye, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Product, ColorOption } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size: string, connectivity: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = React.useState<string>(product.sizes[0]);
  const [selectedConnectivity, setSelectedConnectivity] = React.useState<string>(product.connectivity[0]);
  const [addedAnimation, setAddedAnimation] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize, selectedConnectivity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="sleek-glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex flex-wrap gap-1">
          {product.isNew && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
              NEW 2026
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              BESTSELLER
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-900/60 px-2 py-0.5 rounded-full border border-white/5">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Watch Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-b from-blue-950/20 to-slate-950/80 p-4 mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
          referrerPolicy="no-referrer"
        />

        {/* Hover Quick View overlay */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>ดูรายละเอียดสเปค</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            {product.series}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1 mt-0.5">
            {product.name}
          </h3>
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Color Selection Dots */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] text-slate-400 font-medium">สีตัวเรือน:</p>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.id}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-5 h-5 rounded-full transition-all flex items-center justify-center ${
                  selectedColor.id === color.id
                    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColor.id === color.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-amber-300">
                ฿{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ฿{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-amber-400/80">ผ่อน 0% ฿{(Math.round(product.price / 10)).toLocaleString()}/เดือน</p>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              addedAnimation
                ? 'bg-emerald-500 text-slate-950 scale-95'
                : 'btn-sleek-gold'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>เพิ่มแล้ว</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>สั่งซื้อ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
