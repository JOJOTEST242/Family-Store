
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import StoreSelection from './components/StoreSelection';
import SuccessView from './components/SuccessView';
import { INITIAL_PRODUCTS, CATEGORY_LABELS } from './constants';
import { Product, CartItem, Category } from './types';

type ViewState = 'HOME' | 'STORE' | 'SUCCESS';

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedStore, setSelectedStore] = useState<Category | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // 購物車快取邏輯
  useEffect(() => {
    const savedCart = localStorage.getItem('family-store-cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("購物車解析失敗"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('family-store-cart', JSON.stringify(cart));
  }, [cart]);

  const handleSelectStore = (category: Category) => {
    setSelectedStore(category);
    setCurrentView('STORE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('HOME');
    setSelectedStore(null);
    setIsCartOpen(false);
  };

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setLastNotification(`已加入 ${quantity} 份 ${product.name}`);
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

  const submitOrderToGoogleForm = async (orderer: string, pickupDate: string) => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const structuredOrder = cart.map(item => ({
      name: item.name,
      category: item.category,          
      price: item.price,                
      quantity: item.quantity,           
      subtotal: item.price * item.quantity 
    }));

    const totalAmount = structuredOrder.reduce((sum, item) => sum + item.subtotal, 0);
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScC_1XAtjya1Lpq9KoxpQZh-Tpy-95emW1vWt98_0mS6p0H0g/formResponse";

    const data = new FormData();
    data.append("entry.604511376", orderer);
    data.append("entry.963051135", JSON.stringify(structuredOrder));
    data.append("entry.1626695502", totalAmount.toString());
    data.append("entry.1088144416", pickupDate);

    try {
      await fetch(formUrl, { method: "POST", body: data, mode: "no-cors" });
      setCart([]);
      setIsCartOpen(false);
      setCurrentView('SUCCESS');
    } catch (err) {
      console.error("提交失敗:", err);
      alert("訂單送出失敗，請重試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => p.category === selectedStore);

  return (
    <div className="min-h-screen pb-20 bg-[#f5f5f7]">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        showBack={currentView === 'STORE'}
        onBack={handleBackToHome}
      />

      <main className="max-w-7xl mx-auto px-6 pt-32">
        {currentView === 'HOME' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <header className="mb-12 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">Family Store</h1>
              <p className="text-xl lg:text-2xl text-gray-400 font-medium">今天想從哪裡開始？</p>
            </header>
            <StoreSelection categories={CATEGORY_LABELS} onSelect={handleSelectStore} />
          </div>
        )}

        {currentView === 'STORE' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <button 
                  onClick={handleBackToHome}
                  className="text-blue-600 font-bold flex items-center gap-1 mb-4 hover:underline"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  返回店家選擇
                </button>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">{selectedStore}</h2>
              </div>
              <div className="bg-white/50 apple-blur px-6 py-3 rounded-2xl border border-gray-200/50">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  {filteredProducts.length} 個商品可用
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-32">
                <p className="text-gray-400 text-xl">此分類目前沒有商品。</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'SUCCESS' && (
          <SuccessView onBackToHome={handleBackToHome} />
        )}
      </main>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onSubmit={submitOrderToGoogleForm}
        isSubmitting={isSubmitting}
      />

      {lastNotification && !isCartOpen && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 apple-blur border border-gray-200/50 px-8 py-4 rounded-3xl shadow-2xl z-[80] transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm font-bold tracking-tight flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {lastNotification}
          </p>
        </div>
      )}

      {currentView !== 'SUCCESS' && (
        <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-200/50 text-center text-sm text-gray-400 mt-20">
          <p>© 2026 Family Store. 每一口都是最純粹的家鄉味。</p>
        </footer>
      )}
    </div>
  );
};

export default App;
