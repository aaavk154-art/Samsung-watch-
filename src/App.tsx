import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { WatchStudio } from './components/WatchStudio';
import { SpecComparison } from './components/SpecComparison';
import { ProductModal } from './components/ProductModal';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ColorOption, CustomStrap } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart items state with initial sample or empty
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gw_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'cart-sample-1',
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: PRODUCTS[0].sizes[0],
        selectedConnectivity: PRODUCTS[0].connectivity[0],
        quantity: 1,
      },
    ];
  });

  // Modals & Drawers state
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCode, setCheckoutCode] = useState('');

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gw_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'ai-advisor') {
      setIsAiAdvisorOpen(true);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (
    product: Product,
    selectedColor: ColorOption,
    selectedSize: string,
    selectedConnectivity: string,
    selectedStrap?: CustomStrap
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.id === selectedColor.id &&
          item.selectedSize === selectedSize &&
          item.selectedConnectivity === selectedConnectivity &&
          item.selectedStrap?.id === selectedStrap?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${selectedColor.id}-${Date.now()}`,
          product,
          selectedColor,
          selectedSize,
          selectedConnectivity,
          selectedStrap,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleAddStrapToCart = (strap: CustomStrap) => {
    handleAddToCart(PRODUCTS[1], PRODUCTS[1].colors[0], PRODUCTS[1].sizes[0], PRODUCTS[1].connectivity[0], strap);
  };

  const handleAddToCartCustom = (product: Product, strap: CustomStrap) => {
    handleAddToCart(product, product.colors[0], product.sizes[0], product.connectivity[0], strap);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (discountAmount: number, promoCode: string) => {
    setCheckoutDiscount(discountAmount);
    setCheckoutCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#020b18] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onExploreClick={() => handleNavigate('collection')}
            onCustomStudioClick={() => handleNavigate('studio')}
            onAIClick={() => setIsAiAdvisorOpen(true)}
          />
        </div>

        {/* Product Collection Grid */}
        <ProductGrid
          products={PRODUCTS}
          onQuickView={(p) => setSelectedProductModal(p)}
          onAddToCart={handleAddToCart}
          onAddStrapToCart={handleAddStrapToCart}
          searchQuery={searchQuery}
        />

        {/* 360 Custom Watch Studio */}
        <WatchStudio onAddToCartCustom={handleAddToCartCustom} />

        {/* Specs Comparison Matrix */}
        <SpecComparison />

        {/* Verified User Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer & FAQs */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
      />

      <AIAdvisorModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        promoCode={checkoutCode}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
