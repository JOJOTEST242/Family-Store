
import React, { useState, useEffect, useRef } from 'react';
import { CartItem } from '../types';
import { Icons } from '../constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onSubmit: (orderer: string, pickupDate: string) => void;
  isSubmitting: boolean;
}

const ORDERERS = ["我", "媽媽", "其他"];

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onRemove, 
  onSubmit,
  isSubmitting
}) => {
  const [selectedOrderer, setSelectedOrderer] = useState(ORDERERS[0]);
  const [pickupDate, setPickupDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!pickupDate) setPickupDate(getTodayString());
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDatePickerTrigger = () => {
    if (dateInputRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          (dateInputRef.current as any).showPicker();
        } else {
          dateInputRef.current.focus();
        }
      } catch (e) {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f5f5f7] flex flex-col animate-in slide-in-from-bottom duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
      {/* Navbar for Checkout */}
      <nav className="h-20 px-6 flex items-center justify-between border-b border-gray-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-blue-600 font-semibold transition-opacity active:opacity-50"
          disabled={isSubmitting}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          返回修改
        </button>
        <span className="text-lg font-bold tracking-tight">結帳</span>
        <div className="w-20"></div> {/* Spacer for symmetry */}
      </nav>

      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">確認訂單內容</h1>
            <p className="text-gray-400 font-medium">請核對商品清單與取餐時間</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column: List */}
            <div className="lg:col-span-3 space-y-8">
              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">商品明細 ({items.length})</h3>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="bg-white rounded-[2rem] p-5 flex items-center gap-4 shadow-sm border border-gray-100 group transition-all hover:shadow-md">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-600">NT$ {item.price}</span>
                          <div className="flex items-center bg-gray-100 rounded-full p-1">
                            <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Icons.Minus /></button>
                            <span className="w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Icons.Plus /></button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Icons.Trash />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Sticky Config */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-gray-100 sticky top-32">
                <div className="space-y-8">
                  {/* Orderer */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">下單者</label>
                    <div className="flex p-1 bg-gray-100 rounded-2xl">
                      {ORDERERS.map(person => (
                        <button
                          key={person}
                          onClick={() => setSelectedOrderer(person)}
                          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                            selectedOrderer === person 
                            ? 'bg-white text-black shadow-sm' 
                            : 'text-gray-400'
                          }`}
                        >
                          {person}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">預計取餐日期</label>
                    <div 
                      className="relative cursor-pointer group"
                      onClick={handleDatePickerTrigger}
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icons.Calendar />
                      </div>
                      <input 
                        ref={dateInputRef}
                        type="date" 
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="text-gray-400 font-bold">總金額</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-400">NT$</span>
                        <span className="text-4xl font-black tracking-tighter">{total}</span>
                      </div>
                    </div>

                    <button 
                      disabled={items.length === 0 || isSubmitting}
                      onClick={() => onSubmit(selectedOrderer, pickupDate)}
                      className="w-full bg-black text-white font-bold h-16 rounded-[1.5rem] shadow-2xl transition-all active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>正在送出訂單...</span>
                        </div>
                      ) : (
                        <span>確認下單</span>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-300 text-center mt-4">訂單將同步至 Google Forms 紀錄</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
