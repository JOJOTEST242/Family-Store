
import React from 'react';
import { CartItem } from '../types';
import { Icons } from '../constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onRemove, 
  onSubmit,
  isSubmitting
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight">購物車</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.Close />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto px-8 py-6 hide-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">購物車是空的</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <div className="mt-1 font-medium">NT$ {item.price}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="text-gray-600 hover:text-black"
                      >
                        <Icons.Minus />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="text-gray-600 hover:text-black"
                      >
                        <Icons.Plus />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-8 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 font-medium">總計</span>
            <span className="text-2xl font-bold">NT$ {total}</span>
          </div>
          
          <button 
            disabled={items.length === 0 || isSubmitting}
            onClick={onSubmit}
            className="w-full bg-blue-600 disabled:bg-gray-300 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
          >
            {isSubmitting ? "正在處理..." : "確認送出訂單"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
