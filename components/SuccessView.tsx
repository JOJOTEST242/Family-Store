
import React from 'react';

interface SuccessViewProps {
  onBackToHome: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ onBackToHome }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="w-full max-w-sm text-center">
        {/* Animated Checkmark Icon */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-in zoom-in duration-500 ease-out" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <svg 
              className="w-16 h-16 animate-in slide-in-from-bottom-4 duration-500 delay-150 fill-none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">下單成功</h1>
        <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">
          您的訂單已成功送出。<br />跑腿家人已收到通知，請耐心等待。
        </p>

        <button 
          onClick={onBackToHome}
          className="w-full bg-black text-white font-bold h-16 rounded-[1.5rem] shadow-xl shadow-black/10 active:scale-95 transition-transform"
        >
          回到首頁
        </button>
      </div>
      
      <div className="absolute bottom-12 text-gray-300 font-medium tracking-widest text-[10px] uppercase">
        Family Store Experience
      </div>
    </div>
  );
};

export default SuccessView;
