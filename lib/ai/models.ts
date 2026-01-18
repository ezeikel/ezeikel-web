import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

// Model IDs
export const MODEL_IDS = {
  // OpenAI
  GPT_4O: 'gpt-4o',
  GPT_4O_MINI: 'gpt-4o-mini',

  // Google Gemini
  GEMINI_2_FLASH: 'gemini-2.0-flash',
  GEMINI_2_PRO: 'gemini-2.0-pro',
  GEMINI_2_FLASH_IMAGE: 'gemini-2.0-flash-exp',
} as const;

// Configured models for different purposes
export const models = {
  // Complex text generation (blog content)
  text: openai(MODEL_IDS.GPT_4O),

  // Fast/cheap text generation (metadata, summaries)
  textFast: openai(MODEL_IDS.GPT_4O_MINI),

  // Vision/image analysis (evaluating Pexels photos)
  vision: google(MODEL_IDS.GEMINI_2_PRO),

  // Image generation fallback
  image: google(MODEL_IDS.GEMINI_2_FLASH_IMAGE),
};

export type ModelType = keyof typeof models;
