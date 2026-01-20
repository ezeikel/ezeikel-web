import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

// Model IDs
export const MODEL_IDS = {
  // OpenAI
  GPT_4O: 'gpt-4o',
  GPT_4O_MINI: 'gpt-4o-mini',

  // Google Gemini
  GEMINI_3_FLASH: 'gemini-3-flash-preview',
  GEMINI_3_PRO: 'gemini-3-pro-preview',
  GEMINI_3_PRO_IMAGE: 'gemini-3-pro-image-preview',
} as const;

// Configured models for different purposes
export const models = {
  // Complex text generation (blog content)
  text: openai(MODEL_IDS.GPT_4O),

  // Fast/cheap text generation (metadata, summaries)
  textFast: openai(MODEL_IDS.GPT_4O_MINI),

  // Vision/image analysis (evaluating Pexels photos)
  vision: google(MODEL_IDS.GEMINI_3_PRO),

  // Image generation fallback (use with generateText, not generateImage)
  geminiImage: google(MODEL_IDS.GEMINI_3_PRO_IMAGE),
};

export type ModelType = keyof typeof models;
