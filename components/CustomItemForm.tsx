
import React, { useState } from 'react';
import { Category, Product } from '../types';

interface CustomItemFormProps {
  onAdd: (product: Product) => void;
}

const CustomItemForm: React.FC<CustomItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(Category.CUSTOM);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    onAdd({
      id: `custom-${Date.now()}`,
      name,
      price: parseInt(price),
      category,
      imageUrl: imageUrl || "https://picsum.photos/seed/custom/400/300"
    });

    setName('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <div className="bg-gray-100 rounded-[2.5rem] p-8 mt-12 mb-16 max-w-2xl mx-auto border border-white/50 shadow-inner">
      <h3 className="text-xl font-bold mb-6 text-center">找不到想要的？自己輸入一個</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-4">商品名稱</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="例如：特大拿鐵"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-4">單價 (NT$)</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-white border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="0"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-4">購買來源</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full bg-white border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all shadow-sm appearance-none"
          >
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-4">圖片網址 (選填)</label>
          <input 
            type="url" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-white border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="https://..."
          />
        </div>
        <div className="md:col-span-2 mt-4">
          <button 
            type="submit"
            className="w-full bg-black text-white font-semibold py-4 rounded-2xl hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            直接加入購物車
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomItemForm;
