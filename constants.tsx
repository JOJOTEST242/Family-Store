
import React from 'react';
import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "h1",
    name: "茶葉蛋",
    price: 9,
    category: Category.HI_LIFE,
    imageUrl: "https://i.meee.com.tw/DmDbCrF.jpg"
  },
  {
    id: "f1",
    name: "可樂（小瓶）",
    price: 35,
    category: Category.FAMILY_MART,
    imageUrl: "https://i.meee.com.tw/BCMZOO1.jpg"
  },
  {
    id: "f2",
    name: "麥香奶茶（小瓶）",
    price: 28,
    category: Category.FAMILY_MART,
    imageUrl: "https://i.meee.com.tw/jAsRmGj.jpg"
  },
  {
    id: "f3",
    name: "寶礦力水得（小瓶）",
    price: 29,
    category: Category.FAMILY_MART,
    imageUrl: "https://i.meee.com.tw/9ziewpL.jpg"
  },
  {
    id: "c1",
    name: "饅頭",
    price: 20,
    category: Category.CHINESE_BREAKFAST,
    imageUrl: "https://i.meee.com.tw/fF6f6KO.jpg"
  },
  {
    id: "c2",
    name: "油條",
    price: 20,
    category: Category.CHINESE_BREAKFAST,
    imageUrl: "https://i.meee.com.tw/KXjxY8e.jpg"
  },
  {
    id: "w1",
    name: "漢堡蛋",
    price: 35,
    category: Category.WESTERN_BREAKFAST,
    imageUrl: "https://i.meee.com.tw/IpNN9gZ.jpg"
  }
];

export const CATEGORY_LABELS = [
  Category.HI_LIFE,
  Category.FAMILY_MART,
  Category.CHINESE_BREAKFAST,
  Category.WESTERN_BREAKFAST
];

// Icons (SVG paths) for standard Apple look
export const Icons = {
  Bag: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Minus: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  )
};
