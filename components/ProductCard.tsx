
import React, { useState } from 'react';
import { Product } from '../types';
import { Icons } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [localQty, setLocalQty] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const increment = () => setLocalQty(q => q + 1);
  const decrement = () => setLocalQty(q => Math.max(1, q - 1));

  const handleAdd = () => {
    setIsAnimating(true);
    onAddToCart(product, localQty);
    
    // Micro-interaction: visual feedback and state reset
    setTimeout(() => {
      setIsAnimating(false);
      setLocalQty(1);
    }, 400);
  };

  return (
    <div className="group bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-100">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-6 relative">
        <img 
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/300`} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 apple-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          NT$ {product.price}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{product.category}</p>
      </div>
      
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-3">
          {/* Stepper Control */}
          <div className="flex items-center gap-3 bg-gray-100/80 rounded-2xl px-3 py-2.5 border border-transparent focus-within:border-blue-200 transition-colors">
            <button 
              onClick={decrement}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="減少數量"
            >
              <Icons.Minus />
            </button>
            <span className="text-sm font-bold w-4 text-center tabular-nums">
              {localQty}
            </span>
            <button 
              onClick={increment}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="增加數量"
            >
              <Icons.Plus />
            </button>
          </div>

          {/* Add Button */}
          <button 
            onClick={handleAdd}
            className={`flex-grow bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20 ${
              isAnimating ? 'scale-95 opacity-90' : 'scale-100'
            }`}
          >
            <span className="text-sm">加入購物車</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
