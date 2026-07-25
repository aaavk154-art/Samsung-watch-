import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, ShieldCheck, ChevronRight, Menu, X, Compass, Scale, MessageSquareQuote } from 'lucide-react';

interface NavbarProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemsCount,
  onOpenCart,
  onNavigate,
  activeSection,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'สินค้าทั้งหมด', icon: Compass },
    { id: 'studio', label: 'Studio แต่งนาฬิกา', icon: Sparkles },
    { id: 'compare', label: 'เปรียบเทียบสเปค', icon: Scale },
    { id: 'ai-advisor', label: 'AI ช่วยเลือก', icon: Sparkles, isAi: true },
    { id: 'reviews', label: 'รีวิวผู้ใช้', icon: MessageSquareQuote },
    { id: 'warranty', label: 'รับประกันศูนย์ไทย', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Banner Ribbon */}
      <div className="bg-slate-950/90 text-amber-300 text-xs py-1.5 px-4 text-center border-b border-amber-500/20 flex justify-center items-center gap-3 font-medium tracking-wider">
        <span className="inline-flex items-center gap-1 text-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          รับประกันศูนย์ไทย Samsung 2 ปีเต็ม
        </span>
        <span className="hidden sm:inline text-amber-500/40">•</span>
        <span className="hidden sm:inline-block text-amber-300 font-semibold">
          ✨ ผ่อน 0% นานสูงสุด 10 เดือน
        </span>
        <span className="hidden md:inline text-amber-500/40">•</span>
        <span className="hidden md:inline-block text-slate-300">
          🚚 จัดส่งด่วนฟรีทั่วประเทศ (Express 1-2 วัน)
        </span>
      </div>

      {/* Main Glass Navbar - Sleek Interface Style */}
      <div className="bg-[#020b18]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate('hero')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-blue-600 p-[1px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#020b18] rounded-[7px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 text-lg">S</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-[2px] text-base sm:text-lg text-white uppercase">
                  GALAXY <span className="text-amber-400 font-extrabold">ULTRA</span>
                </span>
              </div>
              <p className="text-[9px] text-amber-400/80 tracking-[2px] uppercase font-medium">Samsung Thailand Official</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 flex items-center gap-1.5 ${
                  activeSection === link.id
                    ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.isAi && <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search Bar & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-48 xl:w-56">
              <input
                type="text"
                placeholder="ค้นหารุ่น/สเปคนาฬิกา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full bg-slate-900/90 text-slate-100 text-xs rounded-full pl-9 pr-4 py-2 border transition-all duration-200 focus:outline-none ${
                  searchFocused
                    ? 'border-amber-400 ring-2 ring-amber-400/20 bg-slate-950 w-64 shadow-lg'
                    : 'border-white/10 hover:border-white/20'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Cart CTA Button */}
            <button
              onClick={onOpenCart}
              className="btn-sleek-gold relative flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">ตะกร้าสินค้า</span>
              {cartItemsCount > 0 && (
                <span className="bg-slate-950 text-amber-300 text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold border border-amber-400 ml-1">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ค้นหานาฬิกา Galaxy Watch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-full pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#020b18]/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-2 backdrop-blur-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-xs uppercase tracking-wider font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.isAi && <Sparkles className="w-4 h-4 text-amber-400" />}
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
