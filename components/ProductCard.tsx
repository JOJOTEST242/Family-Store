
import React from 'react';
import { Product } from '../types';
import { Icons } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-100">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-6">
        <img 
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/300`} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-lg font-medium">NT$ {product.price}</span>
        <button 
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors flex items-center justify-center"
          title="加入購物車"
        >
          <Icons.Plus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
