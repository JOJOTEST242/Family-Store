
export enum Category {
  HI_LIFE = "萊爾富便利商店",
  FAMILY_MART = "全家便利商店",
  CHINESE_BREAKFAST = "中式早餐店",
  WESTERN_BREAKFAST = "西式早餐店",
  CUSTOM = "自訂來源"
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  timestamp: number;
  items: CartItem[];
  totalAmount: number;
  status: 'completed' | 'pending';
}
