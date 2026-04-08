import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const askGemini = async (prompt: string) => {
  try {
    const response = await (ai.models as any).generateContent({
      model: "gemini-3-flash-preview",
      tools: [
        {
          googleSearch: {},
        },
      ],
      contents: [{ role: "user", parts: [{ text: `You are an assistant for "خدمات تنظيف الزجاج أكادير" (Window Cleaning Services Agadir), a professional window cleaning service in Agadir, Morocco.
      Answer the user's question in Moroccan Darija (using Arabic script). 
      Be professional, friendly, and helpful. 
      Always mention that we offer free estimates for all window cleaning jobs.
      Our service areas include all of Agadir and its surrounding areas (Taghazout, Inezgane, Ait Melloul, Drarga, Aourir, Tikiouine, etc.).
      If asked about pricing, explain that it depends on the number and size of windows, and suggest requesting a free quote through the website form.
      
      User question: ${prompt}` }] }],
    });

    return response.text || "سمح ليا، كاين مشكل فالتواصل. حاول مرة أخرى من بعد.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "سمح ليا، كاين مشكل فالتواصل. حاول مرة أخرى من بعد.";
  }
};
