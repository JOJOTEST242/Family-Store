
import React from 'react';
import { Icons } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, showBack, onBack }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 apple-blur border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button 
              onClick={onBack}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="返回"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={onBack}
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform">F</div>
            <span className="font-bold text-xl tracking-tighter hidden sm:block">Family Store</span>
          </div>
        </div>

        <button 
          onClick={onCartClick}
          className="group relative flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full transition-all duration-300 shadow-xl shadow-black/10 active:scale-95"
          aria-label="查看購物車"
        >
          <Icons.Bag />
          <span className="text-sm font-bold pr-1">購物車</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-colors shadow-lg animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
