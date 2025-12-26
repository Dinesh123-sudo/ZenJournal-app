
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AIAnalysis {
  mood: string;
  insight: string;
  tags: string[];
}

export const geminiService = {
  analyzeEntry: async (content: string): Promise<AIAnalysis> => {
    if (!content || content.trim().length < 10) {
      return { mood: 'Reflective', insight: 'Keep writing to see deep AI insights about your day!', tags: [] };
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as a compassionate journal assistant. Analyze the following private reflection and provide a one-word mood, a deep supportive insight, and 3-4 conceptual tags. 
        Entry content: "${content}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              mood: { 
                type: Type.STRING, 
                description: "A single word representing the core emotion (e.g., Grateful, Melancholy, Driven, Peaceful)." 
              },
              insight: { 
                type: Type.STRING, 
                description: "A brief, 1-sentence psychological or mindful insight that provides perspective." 
              },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "Relevant life themes (e.g., Career, Relationships, Health, Growth)." 
              }
            },
            required: ["mood", "insight", "tags"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      return { 
        mood: 'Reflective', 
        insight: 'Your thoughts are being processed. Reflection is the first step to clarity.', 
        tags: ['Reflection'] 
      };
    }
  }
};
