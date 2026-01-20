'use server';

import { generateObject, generateText } from 'ai';
import { z } from 'zod';
import { models } from '@/lib/ai/models';
import {
  BLOG_META_PROMPT,
  BLOG_CONTENT_PROMPT,
  IMAGE_SEARCH_PROMPT,
  IMAGE_EVALUATION_PROMPT,
  IMAGE_GENERATION_PROMPT,
} from '@/lib/ai/prompts';
import {
  BLOG_TOPICS,
  BLOG_AUTHORS,
  BLOG_CATEGORIES,
  IMAGE_EVALUATION_THRESHOLD,
} from '@/constants';
import { writeClient, client } from '@/lib/sanity/client';
import { coveredTopicsQuery, usedPexelsIdsQuery } from '@/lib/sanity/queries';
import {
  fetchBlogPhotosForEvaluation,
  downloadImageAsBuffer,
} from '@/lib/pexels';

// Schemas for AI-generated content
const blogMetaSchema = z.object({
  title: z.string().max(60),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(160),
  keywords: z.array(z.string()).min(4).max(6),
});

const imageSearchSchema = z.object({
  terms: z.array(z.string()).min(3).max(5),
});

const imageEvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  reasoning: z.string(),
});

type BlogMeta = z.infer<typeof blogMetaSchema>;

/**
 * Get covered topics from Sanity to avoid duplicates
 */
async function getCoveredTopics(): Promise<string[]> {
  try {
    const topics = await client.fetch<string[]>(coveredTopicsQuery);
    return topics || [];
  } catch {
    return [];
  }
}

/**
 * Get used Pexels photo IDs to avoid duplicates
 */
async function getUsedPexelsIds(): Promise<string[]> {
  try {
    const ids = await client.fetch<string[]>(usedPexelsIdsQuery);
    return ids || [];
  } catch {
    return [];
  }
}

/**
 * Select a random uncovered topic
 */
function selectRandomTopic(
  coveredTopics: string[],
): (typeof BLOG_TOPICS)[0] | null {
  const uncoveredTopics = BLOG_TOPICS.filter(
    (t) => !coveredTopics.includes(t.topic),
  );

  if (uncoveredTopics.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * uncoveredTopics.length);
  return uncoveredTopics[randomIndex];
}

/**
 * Generate blog post metadata
 */
async function generateBlogMeta(
  topic: string,
  keywords: string[],
): Promise<BlogMeta> {
  const prompt = BLOG_META_PROMPT.replace('{topic}', topic);

  const { object } = await generateObject({
    model: models.textFast,
    schema: blogMetaSchema,
    prompt,
  });

  return object;
}

/**
 * Generate blog post content
 */
async function generateBlogContent(
  topic: string,
  title: string,
  coveredTopics: string[],
): Promise<string> {
  const prompt = BLOG_CONTENT_PROMPT.replace('{topic}', topic)
    .replace('{title}', title)
    .replace('{coveredTopics}', coveredTopics.slice(0, 10).join(', '));

  const { text } = await generateText({
    model: models.text,
    prompt,
    temperature: 0.7,
  });

  return text;
}

/**
 * Generate image search terms
 */
async function generateImageSearchTerms(
  title: string,
  excerpt: string,
  category: string,
): Promise<string[]> {
  const prompt = IMAGE_SEARCH_PROMPT.replace('{title}', title)
    .replace('{excerpt}', excerpt)
    .replace('{category}', category);

  const { object } = await generateObject({
    model: models.textFast,
    schema: imageSearchSchema,
    prompt,
  });

  return object.terms;
}

/**
 * Evaluate image relevance using AI vision
 */
async function evaluateImageRelevance(
  imageUrl: string,
  context: { title: string; excerpt: string; category: string },
): Promise<{ score: number; reasoning: string }> {
  const prompt = IMAGE_EVALUATION_PROMPT.replace('{title}', context.title)
    .replace('{excerpt}', context.excerpt)
    .replace('{category}', context.category);

  try {
    const { object } = await generateObject({
      model: models.vision,
      schema: imageEvaluationSchema,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: new URL(imageUrl) },
          ],
        },
      ],
    });

    return object;
  } catch (error) {
    console.error('Image evaluation error:', error);
    return { score: 0, reasoning: 'Evaluation failed' };
  }
}

/**
 * Find the best image from candidates
 */
async function findBestImage(
  photos: { id: number; src: { large: string }; alt: string | null }[],
  context: { title: string; excerpt: string; category: string },
  threshold: number,
): Promise<{
  selectedPhoto: (typeof photos)[0] | null;
  selectedIndex: number;
  evaluations: { score: number; reasoning: string }[];
}> {
  const evaluations: { score: number; reasoning: string }[] = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const evaluation = await evaluateImageRelevance(photo.src.large, context);
    evaluations.push(evaluation);

    if (evaluation.score >= threshold) {
      return {
        selectedPhoto: photo,
        selectedIndex: i,
        evaluations,
      };
    }
  }

  // Return the highest scoring photo if none meet threshold
  const maxScore = Math.max(...evaluations.map((e) => e.score));
  const maxIndex = evaluations.findIndex((e) => e.score === maxScore);

  return {
    selectedPhoto: maxScore > 0 ? photos[maxIndex] : null,
    selectedIndex: maxIndex,
    evaluations,
  };
}

/**
 * Generate a featured image using Gemini 3 Pro Image
 * Fallback when Pexels images don't meet quality threshold
 */
async function generateImageWithGemini(
  title: string,
): Promise<{ buffer: Buffer; mimeType: string } | null> {
  const prompt = IMAGE_GENERATION_PROMPT.replace('{{TITLE}}', title);

  try {
    console.log('Generating image with Gemini 3 Pro Image...');

    const result = await generateText({
      model: models.geminiImage,
      prompt: `Generate a high-quality professional photograph for this blog post. Do not include any text in the image. ${prompt}`,
    });

    const imageFile = result.files?.find((f) =>
      f.mimeType?.startsWith('image/'),
    );

    if (imageFile) {
      console.log('Gemini 3 Pro Image generated image successfully');
      const buffer = Buffer.from(imageFile.uint8Array);
      return {
        buffer,
        mimeType: imageFile.mimeType,
      };
    }

    console.error('Gemini 3 Pro Image response did not contain image data');
    return null;
  } catch (error) {
    console.error('Gemini 3 Pro Image generation failed:', error);
    return null;
  }
}

type PortableTextSpan = {
  _type: string;
  _key: string;
  text: string;
  marks?: string[];
};

type PortableTextBlock = {
  _type: string;
  _key: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: { _type: string; _key: string; href?: string }[];
  listItem?: string;
  level?: number;
  language?: string;
  code?: string;
};

/**
 * Parse inline markdown marks (bold, italic, inline code) within text
 */
function parseInlineMarks(
  text: string,
  generateKey: () => string,
): PortableTextSpan[] {
  const spans: PortableTextSpan[] = [];

  // Regex to match inline formatting: **bold**, *italic*, `code`
  // Order matters: check ** before * to avoid conflicts
  const inlineRegex = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`)/g;

  let lastIndex = 0;
  let match = inlineRegex.exec(text);

  while (match !== null) {
    // Add text before the match as plain span
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      if (plainText) {
        spans.push({
          _type: 'span',
          _key: generateKey(),
          text: plainText,
        });
      }
    }

    // Determine which pattern matched
    if (match[2] !== undefined) {
      // **bold**
      spans.push({
        _type: 'span',
        _key: generateKey(),
        text: match[2],
        marks: ['strong'],
      });
    } else if (match[3] !== undefined) {
      // *italic*
      spans.push({
        _type: 'span',
        _key: generateKey(),
        text: match[3],
        marks: ['em'],
      });
    } else if (match[4] !== undefined) {
      // `code`
      spans.push({
        _type: 'span',
        _key: generateKey(),
        text: match[4],
        marks: ['code'],
      });
    }

    lastIndex = match.index + match[0].length;
    match = inlineRegex.exec(text);
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      spans.push({
        _type: 'span',
        _key: generateKey(),
        text: remainingText,
      });
    }
  }

  // If no matches found, return original text as single span
  if (spans.length === 0) {
    spans.push({
      _type: 'span',
      _key: generateKey(),
      text,
    });
  }

  return spans;
}

/**
 * Convert markdown to Portable Text blocks
 */
function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  let keyCounter = 0;

  const generateKey = () => {
    keyCounter++;
    return `block_${keyCounter}`;
  };

  // First, extract code blocks and replace with placeholders
  const codeBlocks: { language: string; code: string }[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

  const processedMarkdown = markdown.replace(
    codeBlockRegex,
    (_, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push({
        language: lang || 'text',
        code: code.trim(),
      });
      return `__CODE_BLOCK_${index}__`;
    },
  );

  const lines = processedMarkdown.split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;

    // Check for code block placeholder (trim whitespace to handle indented code blocks)
    const trimmedLine = line.trim();
    const codeBlockMatch = trimmedLine.match(/^__CODE_BLOCK_(\d+)__$/);
    if (codeBlockMatch) {
      const codeBlock = codeBlocks[parseInt(codeBlockMatch[1])];
      blocks.push({
        _type: 'code',
        _key: generateKey(),
        language: codeBlock.language,
        code: codeBlock.code,
      });
      continue;
    }

    // Headers
    if (line.startsWith('#### ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h4',
        children: parseInlineMarks(line.slice(5), generateKey),
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: parseInlineMarks(line.slice(4), generateKey),
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: parseInlineMarks(line.slice(3), generateKey),
      });
    } else if (line.startsWith('# ')) {
      // Skip h1 headers as they're typically the title
      continue;
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        children: parseInlineMarks(line.slice(2), generateKey),
      });
    }
    // List items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: parseInlineMarks(line.slice(2), generateKey),
      });
    }
    // Numbered list items
    else if (/^\d+\. /.test(line)) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: parseInlineMarks(line.replace(/^\d+\. /, ''), generateKey),
      });
    }
    // Normal paragraphs
    else {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: parseInlineMarks(line, generateKey),
      });
    }
  }

  return blocks;
}

/**
 * Upload image to Sanity
 */
async function uploadImageToSanity(
  buffer: Buffer,
  filename: string,
): Promise<string> {
  const asset = await writeClient.assets.upload('image', buffer, {
    filename,
  });
  return asset._id;
}

/**
 * Create or find author in Sanity
 */
async function getOrCreateAuthor(): Promise<string> {
  const author = BLOG_AUTHORS[0];

  // Check if author exists
  const existingAuthor = await client.fetch<{ _id: string } | null>(
    `*[_type == "author" && slug.current == $slug][0]{ _id }`,
    { slug: author.slug },
  );

  if (existingAuthor) {
    return existingAuthor._id;
  }

  // Create author
  const newAuthor = await writeClient.create({
    _type: 'author',
    name: author.name,
    slug: { _type: 'slug', current: author.slug },
    bio: author.bio,
    twitter: author.twitter,
  });

  return newAuthor._id;
}

/**
 * Get or create category in Sanity
 */
async function getOrCreateCategory(categorySlug: string): Promise<string> {
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) {
    throw new Error(`Category not found: ${categorySlug}`);
  }

  // Check if category exists
  const existingCategory = await client.fetch<{ _id: string } | null>(
    `*[_type == "category" && slug.current == $slug][0]{ _id }`,
    { slug: category.slug },
  );

  if (existingCategory) {
    return existingCategory._id;
  }

  // Create category
  const newCategory = await writeClient.create({
    _type: 'category',
    title: category.title,
    slug: { _type: 'slug', current: category.slug },
    description: category.description,
    color: category.color,
  });

  return newCategory._id;
}

/**
 * Create the blog post in Sanity
 */
async function createSanityPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  body: ReturnType<typeof markdownToPortableText>;
  topic: string;
  authorId: string;
  categoryId: string;
  imageAssetId: string | null;
  imageAlt: string;
  imageSource: 'pexels' | 'gemini';
  pexelsPhotoId: string | null;
  keywords: string[];
}): Promise<{ postId: string; slug: string }> {
  const post = await writeClient.create({
    _type: 'post',
    title: data.title,
    slug: { _type: 'slug', current: data.slug },
    excerpt: data.excerpt,
    body: data.body,
    author: { _type: 'reference', _ref: data.authorId },
    categories: [{ _type: 'reference', _ref: data.categoryId }],
    publishedAt: new Date().toISOString(),
    status: 'published',
    featuredImage: data.imageAssetId
      ? {
          asset: { _type: 'reference', _ref: data.imageAssetId },
          alt: data.imageAlt,
          credit: data.imageSource === 'pexels' ? 'Pexels' : 'AI Generated',
        }
      : undefined,
    seo: {
      metaTitle: data.title,
      metaDescription: data.excerpt,
      keywords: data.keywords,
    },
    generationMeta: {
      isGenerated: true,
      topic: data.topic,
      generatedAt: new Date().toISOString(),
      model: 'gpt-4o',
      imageSource: data.imageSource,
      pexelsPhotoId: data.pexelsPhotoId,
    },
  });

  return { postId: post._id, slug: data.slug };
}

/**
 * Main function to generate a random blog post
 */
export async function generateRandomBlogPost(): Promise<{
  success: boolean;
  postId?: string;
  slug?: string;
  topic?: string;
  error?: string;
}> {
  try {
    // Get covered topics
    const coveredTopics = await getCoveredTopics();

    // Select random uncovered topic
    const selectedTopic = selectRandomTopic(coveredTopics);
    if (!selectedTopic) {
      return {
        success: true,
        error: 'All topics have been covered',
      };
    }

    console.log(`Generating post for topic: ${selectedTopic.topic}`);

    // Generate metadata
    const meta = await generateBlogMeta(
      selectedTopic.topic,
      selectedTopic.keywords,
    );
    console.log(`Generated meta: ${meta.title}`);

    // Generate content
    const content = await generateBlogContent(
      selectedTopic.topic,
      meta.title,
      coveredTopics,
    );
    console.log(`Generated content: ${content.length} characters`);

    // Convert to Portable Text
    const body = markdownToPortableText(content);

    // Get/create author and category
    const authorId = await getOrCreateAuthor();
    const categoryId = await getOrCreateCategory(selectedTopic.category);

    // Generate image search terms
    const searchTerms = await generateImageSearchTerms(
      meta.title,
      meta.excerpt,
      selectedTopic.category,
    );
    console.log(`Image search terms: ${searchTerms.join(', ')}`);

    // Fetch candidate photos
    const usedPexelsIds = await getUsedPexelsIds();
    const { photos, error: pexelsError } = await fetchBlogPhotosForEvaluation(
      searchTerms,
      { maxPhotos: 5, excludeIds: usedPexelsIds },
    );

    let imageAssetId: string | null = null;
    let imageSource: 'pexels' | 'gemini' = 'pexels';
    let pexelsPhotoId: string | null = null;
    let imageAlt = meta.title;

    if (photos.length > 0 && !pexelsError) {
      // Evaluate images
      const { selectedPhoto } = await findBestImage(
        photos,
        {
          title: meta.title,
          excerpt: meta.excerpt,
          category: selectedTopic.category,
        },
        IMAGE_EVALUATION_THRESHOLD,
      );

      if (selectedPhoto) {
        console.log(`Selected Pexels photo: ${selectedPhoto.id}`);

        // Download and upload to Sanity
        const imageBuffer = await downloadImageAsBuffer(
          selectedPhoto.src.large,
        );
        imageAssetId = await uploadImageToSanity(
          imageBuffer,
          `${meta.slug}.jpg`,
        );
        pexelsPhotoId = String(selectedPhoto.id);
        imageAlt = selectedPhoto.alt || meta.title;
      }
    }

    // Fallback to Gemini image generation if no suitable Pexels photo
    if (!imageAssetId) {
      console.log('No suitable Pexels image found, falling back to Gemini...');
      const geminiResult = await generateImageWithGemini(meta.title);

      if (geminiResult) {
        const extension = geminiResult.mimeType.includes('png') ? 'png' : 'jpg';
        imageAssetId = await uploadImageToSanity(
          geminiResult.buffer,
          `${meta.slug}-generated.${extension}`,
        );
        imageSource = 'gemini';
        imageAlt = meta.title;
        console.log('Successfully generated and uploaded Gemini image');
      } else {
        console.log('Gemini image generation failed, proceeding without image');
      }
    }

    // Create the post
    const result = await createSanityPost({
      title: meta.title,
      slug: meta.slug,
      excerpt: meta.excerpt,
      body,
      topic: selectedTopic.topic,
      authorId,
      categoryId,
      imageAssetId,
      imageAlt,
      imageSource,
      pexelsPhotoId,
      keywords: meta.keywords,
    });

    console.log(`Created post: ${result.postId}`);

    return {
      success: true,
      postId: result.postId,
      slug: result.slug,
      topic: selectedTopic.topic,
    };
  } catch (error) {
    console.error('Blog generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get blog topic stats
 */
export async function getBlogTopicStats(): Promise<{
  totalTopics: number;
  coveredCount: number;
  remainingCount: number;
  percentComplete: number;
}> {
  const coveredTopics = await getCoveredTopics();
  const totalTopics = BLOG_TOPICS.length;
  const coveredCount = coveredTopics.length;
  const remainingCount = totalTopics - coveredCount;
  const percentComplete = Math.round((coveredCount / totalTopics) * 100);

  return {
    totalTopics,
    coveredCount,
    remainingCount,
    percentComplete,
  };
}
