
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import ReceiptTemplate from './components/ReceiptTemplate';
import { INITIAL_PRODUCTS, CATEGORY_LABELS, Icons } from './constants';
import { Product, CartItem, Order, Category } from './types';
import { toPng } from 'html-to-image';

const LOCAL_BLESSINGS = [
  "願這份簡單的選擇，帶給您一整天的好心情。",
  "每一份心意，都是家庭最溫暖的連結。",
  "生活中的小確幸，從挑選這份禮物開始。",
  "平凡的日子裡，因為有你而變得特別。",
  "感謝您的陪伴，祝您有個美好且充實的一天。",
  "暖心的滋味，值得與最親愛的家人分享。",
  "簡單的幸福，往往藏在細節的關懷裡。",
  "生活不需要複雜，一份心意就足夠溫暖。"
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastNotification, setLastNotification] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderBlessing, setOrderBlessing] = useState<string>("");
  const receiptRef = useRef<HTMLDivElement>(null);

  // 監聽捲動以決定是否顯示「返回頂部」
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('family-store-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('family-store-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setLastNotification(`已加入 ${product.name}`);
    setTimeout(() => setLastNotification(null), 2000);
  }, []);

  const updateCartQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const submitOrder = async () => {
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    const order: Order = {
      id: `ord-${Date.now().toString().slice(-6)}`,
      timestamp: Date.now(),
      items: [...cart],
      totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'completed'
    };

    try {
      const randomBlessing = LOCAL_BLESSINGS[Math.floor(Math.random() * LOCAL_BLESSINGS.length)];
      setOrderBlessing(randomBlessing);
      setCurrentOrder(order);

      await new Promise(resolve => setTimeout(resolve, 500));

      if (receiptRef.current) {
        try {
          const dataUrl = await toPng(receiptRef.current, { 
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#ffffff'
          });
          
          const link = document.createElement('a');
          link.download = `FamilyStore_Receipt_${order.id}.png`;
          link.href = dataUrl;
          link.click();
          
          setCart([]);
          setIsCartOpen(false);
          setLastNotification("訂單已完成！收據圖檔已自動下載。");
          setTimeout(() => setLastNotification(null), 3000);
        } catch (err) {
          console.error('Image generation error:', err);
          alert("收據圖片生成失敗，但訂單資料已送出。");
        }
      }
    } catch (err) {
      alert("訂單送出失敗，請檢查系統狀態。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f5f5f7]">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="max-w-6xl mx-auto px-6 pt-32">
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Family Store</h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium">為家人挑選最暖心的餐點與零食。</p>
        </header>

        {CATEGORY_LABELS.map(catLabel => (
          <section key={catLabel} className="mb-20">
            <h2 className="text-3xl font-bold mb-10 tracking-tight flex items-center gap-3">
              <span className="w-1.5 h-8 bg-black rounded-full"></span>
              {catLabel}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products
                .filter(p => p.category === catLabel)
                .map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onSubmit={submitOrder}
        isSubmitting={isSubmitting}
      />

      <div style={{ position: 'fixed', left: '-3000px', top: 0, pointerEvents: 'none' }}>
        <ReceiptTemplate 
          ref={receiptRef}
          order={currentOrder}
          blessing={orderBlessing}
        />
      </div>

      {/* 返回頂部按鈕 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 w-14 h-14 apple-blur border border-gray-200 rounded-full shadow-2xl z-50 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 ${
          showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
        }`}
        aria-label="返回頂部"
      >
        <Icons.ArrowUp />
      </button>

      {lastNotification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 apple-blur border border-gray-200/50 px-8 py-4 rounded-full shadow-2xl z-[100] transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm font-bold tracking-tight">{lastNotification}</p>
        </div>
      )}

      <footer className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-200/50 text-center text-sm text-gray-400">
        <p>© 2026 Family Store. 極簡美學收據生成系統。</p>
      </footer>
    </div>
  );
};

export default App;
