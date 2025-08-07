import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function gemini(contents: string) : Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });
  return response.text || "";
}
