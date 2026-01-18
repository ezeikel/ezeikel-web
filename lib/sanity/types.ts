import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type SanitySlug = {
  _type: 'slug';
  current: string;
};

export type SanityAuthor = {
  _id: string;
  name: string;
  slug?: SanitySlug;
  image?: SanityImageSource;
  bio?: string;
  twitter?: string;
  website?: string;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
};

export type SanityFeaturedImage = {
  asset?: SanityImageSource;
  alt?: string;
  credit?: string;
};

export type SanitySEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

export type SanityGenerationMeta = {
  isGenerated?: boolean;
  topic?: string;
  generatedAt?: string;
  model?: string;
  imageSource?: 'manual' | 'pexels' | 'gemini' | 'dalle';
  pexelsPhotoId?: string;
  imagePrompt?: string;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  featuredImage?: SanityFeaturedImage;
  body?: PortableTextBlock[];
  author?: SanityAuthor;
  categories?: SanityCategory[];
  publishedAt?: string;
  status?: 'draft' | 'published' | 'scheduled';
  seo?: SanitySEO;
  generationMeta?: SanityGenerationMeta;
};

export type SanityProjectMetric = {
  label: string;
  value: string;
};

export type SanityProjectScreenshot = {
  asset: SanityImageSource;
  alt?: string;
};

export type SanityProject = {
  _id: string;
  title: string;
  slug: SanitySlug;
  tagline?: string;
  description?: string;
  icon?: string;
  iconBg?: string;
  image?: SanityImageSource;
  logo?: SanityImageSource;
  screenshots?: SanityProjectScreenshot[];
  status?: 'Live' | 'Beta' | 'Coming Soon' | 'Experiment' | 'Archived';
  category?: 'Consumer Apps' | 'Dev Tools' | 'Experiments';
  url?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  technologies?: string[];
  features?: string[];
  metrics?: SanityProjectMetric[];
  role?: string[];
  problem?: string;
  solution?: string;
  featured?: boolean;
  order?: number;
};

export type SanityBook = {
  _id: string;
  title: string;
  author: string;
  cover?: SanityImageSource;
  status?: 'currently-reading' | 'finished' | 'want-to-read';
  rating?: number;
  takeaway?: string;
  review?: string;
  goodreadsUrl?: string;
  amazonUrl?: string;
  finishedAt?: string;
  category?: 'fiction' | 'self-improvement' | 'tech-business' | 'biography' | 'other';
  favorite?: boolean;
  order?: number;
};

export type SanityEquipment = {
  _id: string;
  name: string;
  description?: string;
  image?: SanityImageSource;
  category?: string;
  url?: string;
  affiliateUrl?: string;
};

export type SanityPhoto = {
  _id: string;
  title?: string;
  image: SanityImageSource;
  alt?: string;
  location?: string;
  takenAt?: string;
  camera?: string;
  category?: string;
  featured?: boolean;
};
