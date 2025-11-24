import { GoogleGenAI } from "@google/genai";
import { AIContentRequest } from "../types";

// Initialize the client. In a real app, API_KEY comes from process.env
// The prompt requires using process.env.API_KEY directly.
const getClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  // Note: If no key is present, the API call will fail gracefully in the UI.
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingContent = async (request: AIContentRequest): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = 'gemini-2.5-flash';

    let systemInstruction = "You are an expert digital marketing copywriter.";
    let prompt = "";

    switch (request.type) {
      case 'BLOG':
        prompt = `Write a comprehensive, SEO-optimized blog post outline and intro about: "${request.topic}". Tone: ${request.tone}. Use Markdown formatting.`;
        break;
      case 'SOCIAL':
        prompt = `Create 5 engaging social media posts (LinkedIn & Twitter) about: "${request.topic}". Tone: ${request.tone}. Include hashtags.`;
        break;
      case 'EMAIL':
        prompt = `Write a cold outreach email sequence (Subject + Body) for selling services related to: "${request.topic}". Tone: ${request.tone}.`;
        break;
      case 'AD':
        prompt = `Write 3 variations of high-converting ad copy (Headline + Primary Text) for: "${request.topic}". Tone: ${request.tone}.`;
        break;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to generate content. Please check your API Key configuration.";
  }
};