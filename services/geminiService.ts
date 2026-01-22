
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, ArchitectureGraph } from "../types";
import { SYSTEM_INSTRUCTION, AI_CONFIG } from "../constants";

export class GeminiService {
  // Always create a new instance right before making an API call to ensure fresh configuration
  async sendMessage(history: Message[], apiKey: string): Promise<{ text: string; architecture?: ArchitectureGraph }> {
    const ai = new GoogleGenAI({ apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: AI_CONFIG.textModel,
      // Filter history to ensure only user/model turns are passed in contents
      contents: history
        .filter(h => h.role !== 'system')
        .map(h => ({
          role: h.role === 'assistant' ? 'model' as any : 'user' as any,
          parts: [{ text: h.content }]
        })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\nYou are reviewing a text-based summary of the user's Excalidraw drawing. Use it to provide high-quality architectural critiques. If they describe a system change, acknowledge what you see on the board.",
        temperature: AI_CONFIG.generationConfig.temperature,
        topP: AI_CONFIG.generationConfig.topP,
      },
    });

    // Access the text property directly (not a method call)
    const fullText = response.text || "I'm sorry, I couldn't generate a response.";
    
    // Extract architecture JSON if present (legacy support for structured data)
    let architecture: ArchitectureGraph | undefined;
    const archMatch = fullText.match(/```json_architecture\n([\s\S]*?)\n```/);
    
    let cleanText = fullText;
    if (archMatch) {
      try {
        architecture = JSON.parse(archMatch[1]);
        cleanText = fullText.replace(/```json_architecture[\s\S]*?```/, "").trim();
      } catch (e) {
        console.error("Failed to parse architecture JSON", e);
      }
    }

    return { text: cleanText, architecture };
  }
}

export const gemini = new GeminiService();
