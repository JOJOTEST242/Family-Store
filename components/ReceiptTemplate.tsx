import React from 'react';
import { Order } from '../types';

interface ReceiptTemplateProps {
  order: Order | null;
  blessing?: string;
}

const ReceiptTemplate = React.forwardRef<HTMLDivElement, ReceiptTemplateProps>(({ order, blessing }, ref) => {
  if (!order) return null;

  // 確保生成的圖片使用蘋果風格字體 stack
  const systemFontStack = '-apple-system, BlinkMacSystemFont, "SF Pro TC", "PingFang TC", "Helvetica Neue", Arial, "Noto Sans TC", sans-serif';

  return (
    <div 
      ref={ref}
      style={{ 
        width: '500px', 
        backgroundColor: 'white', 
        padding: '60px 40px', 
        fontFamily: systemFontStack,
        lineHeight: '1.5',
        color: '#1d1d1f'
      }}
    >
      {/* 頂部標題：增加字距營造高級感 */}
      <div className="text-center mb-14">
        <h1 style={{ letterSpacing: '0.25em' }} className="text-2xl font-bold mb-2">FAMILY STORE</h1>
        <p style={{ letterSpacing: '0.4em' }} className="text-[9px] text-gray-400 uppercase">Official Receipt</p>
      </div>

      {/* 訂單資訊 */}
      <div className="flex justify-between text-[11px] text-gray-500 mb-10 border-b border-gray-100 pb-6">
        <div>
          <p className="mb-1">訂單編號: <span className="text-gray-900 font-medium">{order.id}</span></p>
          <p>日期: {new Date(order.timestamp).toLocaleString('zh-TW')}</p>
        </div>
        <div className="text-right">
          <p className="mb-1">付款狀態: 已完成</p>
          <p>支付方式: 現金</p>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="space-y-7 mb-12">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div className="flex-grow pr-4">
              <h4 className="text-[14px] font-medium text-gray-800 mb-1">{item.name}</h4>
              <p className="text-[10px] text-gray-400">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold">NT$ {item.price * item.quantity}</p>
              <p className="text-[9px] text-gray-400">數量: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 總額：蘋果風格的大標題對比 */}
      <div className="border-t-[1.5px] border-gray-900 pt-6 mb-12">
        <div className="flex justify-between items-end">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
          <span className="text-4xl font-bold tracking-tighter">NT$ {order.totalAmount}</span>
        </div>
      </div>

      {/* 暖心話語區：使用圓角與柔和背景 */}
      <div className="bg-[#f5f5f7] rounded-2xl p-6 text-center">
        <p className="text-[13px] text-gray-600 leading-relaxed font-normal">
          「 {blessing || "願這份簡單的選擇，帶給您一整天的好心情。"} 」
        </p>
      </div>

      {/* 頁尾小字 */}
      <div className="mt-16 text-center">
        <p className="text-[8px] text-gray-300 uppercase tracking-[0.6em]">
          Thank you for being part of our family
        </p>
      </div>
    </div>
  );
});

export default ReceiptTemplate;
