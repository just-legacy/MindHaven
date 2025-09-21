
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeJournalEntry = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a compassionate mental health assistant named Haven. Read the following journal entry and provide a short (under 60 words), gentle, and encouraging reflection. Focus on acknowledging the user's feelings and offer a message of hope, strength, or self-kindness. Do not give medical advice. Journal entry: "${text}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    return "I'm having a little trouble reflecting right now, but please know that your thoughts are valid and important.";
  }
};

export const getPositiveAffirmation = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Generate one short, powerful, and unique positive affirmation for someone working on their mental well-being. Make it personal, using "I am" or "I can".',
    });
    return response.text.replace(/"/g, ''); // Remove quotes from response
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    return "I am capable of overcoming any challenge that comes my way.";
  }
};
