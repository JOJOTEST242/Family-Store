
import React from 'react';
import { Category } from '../types';

interface StoreSelectionProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  [Category.HI_LIFE]: "https://i.meee.com.tw/fNAVt8R.png",
  [Category.FAMILY_MART]: "https://i.meee.com.tw/wlBz3mg.png",
  [Category.CHINESE_BREAKFAST]: "https://i.meee.com.tw/l4zdpgn.png",
  [Category.WESTERN_BREAKFAST]: "https://i.meee.com.tw/6xYED2K.png",
};

const StoreSelection: React.FC<StoreSelectionProps> = ({ categories, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="group relative h-[300px] lg:h-[450px] w-full rounded-[3.5rem] overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,0,0,0.15)] isolate border border-gray-100"
          style={{ 
            /* 修正硬體加速下的圓角邊界問題 */
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            transform: 'translateZ(0)',
          }}
        >
          {/* 1. 背景圖片層 - 懸停時略微放大並增加亮度 */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:brightness-[1.02]"
            style={{ 
              backgroundImage: `url(${CATEGORY_IMAGES[cat] || 'https://picsum.photos/800/600'})`,
              zIndex: 1
            }}
          />
          
          {/* 2. 極致清透的覆蓋層 - 僅在懸停時增加微光效果 */}
          <div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" 
            style={{ zIndex: 2 }} 
          />
          
          {/* 3. 核心懸停回饋：中心箭頭按鈕 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100" style={{ zIndex: 10 }}>
            <div className="w-16 h-16 bg-white/30 backdrop-blur-2xl text-white rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* 4. 頂部細微光澤線 (Edge Lighting) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ zIndex: 5 }} />
          
          {/* 5. 底部陰影加強 (僅在懸停時隱約透出) */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ zIndex: 3 }} />
        </button>
      ))}
    </div>
  );
};

export default StoreSelection;
