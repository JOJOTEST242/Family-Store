
import React from 'react';
import { Icons } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 apple-blur border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">F</div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">Family Store</span>
        </div>

        <button 
          onClick={onCartClick}
          className="group relative flex items-center gap-2.5 px-4 py-2 bg-gray-100/80 hover:bg-black hover:text-white rounded-full transition-all duration-300 shadow-sm"
          aria-label="查看購物車"
        >
          <Icons.Bag />
          <span className="text-sm font-semibold pr-1">購物車</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white group-hover:border-black transition-colors shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
