
import { GoogleGenAI } from "@google/genai";
import { Order } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateOrderBlessing = async (order: Order) => {
  const itemsText = order.items.map(item => item.name).join('、');

  const prompt = `
    請根據這份訂單商品：${itemsText}，寫一句極簡、溫馨且具有質感的繁體中文祝福語（20-40字）。
    這句話會放在收據的最下方送給家人。
    風格要像 Apple 的文案那樣充滿溫度但又簡約。
    直接輸出文字，不要標點符號之外的任何格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "願這份簡單的選擇，帶給您一整天的好心情。";
  }
};
