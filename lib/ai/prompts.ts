// Blog generation prompts

export const BLOG_META_PROMPT = `You are a content strategist for a tech-focused indie hacker and content creator.
Generate engaging blog post metadata for the following topic.

Topic: {topic}

Requirements:
- Title should be catchy, SEO-friendly, and under 60 characters
- Slug should be URL-friendly (lowercase, hyphens, no special characters)
- Excerpt should be a compelling 1-2 sentence summary (under 160 characters)
- Keywords should be 4-6 relevant SEO keywords

The content should appeal to:
- Software developers interested in indie hacking
- Content creators looking to build an audience
- Tech enthusiasts interested in React, Next.js, and AI`;

export const BLOG_CONTENT_PROMPT = `You are an experienced tech blogger and indie hacker writing for ezeikel.dev.
Write a comprehensive, engaging blog post on the following topic.

Topic: {topic}
Title: {title}

Requirements:
- Write in a conversational, first-person style
- Include practical insights and actionable advice
- Use clear section headings (## for H2, ### for H3)
- Include code examples where relevant (using markdown code blocks)
- Aim for 1200-1800 words
- Include a compelling introduction and conclusion
- Add bullet points or numbered lists where appropriate

Avoid:
- Topics that have already been covered: {coveredTopics}
- Generic filler content
- Overly promotional language
- Clichés and buzzwords

The audience is:
- Software developers (React, Next.js, TypeScript)
- Indie hackers and solo founders
- Content creators interested in tech`;

export const IMAGE_SEARCH_PROMPT = `Generate 3-5 relevant search terms for finding a stock photo for a blog post.

Blog Title: {title}
Excerpt: {excerpt}
Category: {category}

Requirements:
- Terms should be specific enough to find relevant photos
- Focus on visual concepts, not abstract ideas
- Avoid trademarked terms or brand names
- Each term should be 1-3 words

Return as a comma-separated list.`;

export const IMAGE_EVALUATION_PROMPT = `Evaluate how well this image matches the blog post context.

Blog Title: {title}
Excerpt: {excerpt}
Category: {category}

Rate the image on a scale of 0-100 based on:
- Relevance to the blog topic (40 points)
- Visual quality and composition (30 points)
- Professional appearance suitable for a tech blog (30 points)

Return a JSON object with:
- score: number (0-100)
- reasoning: string (brief explanation of the score)`;
