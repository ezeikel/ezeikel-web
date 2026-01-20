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

CODE EXAMPLE STYLE GUIDE (follow these strictly):
- Use TypeScript with latest Next.js App Router patterns
- Use \`type\` instead of \`interface\` for type definitions
- Avoid React.FC - use \`({ prop1, prop2 }: PropsType) => { }\` pattern
- Use arrow functions for components
- Define arrow function first, then \`export default ComponentName\` at bottom
- Use CamelCase for component filenames (e.g., UserProfile.tsx)
- Use kebab-case for utility files (e.g., format-date.ts)
- Keep components small, composable, and easy to test
- Use meaningful, readable variable and function names
- Follow clean, minimalist code style
- For icons, prefer Font Awesome Pro with size prop (not h-/w- classes)

Example component structure:
\`\`\`tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
\`\`\`

Avoid:
- Topics that have already been covered: {coveredTopics}
- Generic filler content
- Overly promotional language
- Clichés and buzzwords
- Using \`interface\` (use \`type\` instead)
- Using React.FC
- Inline exports on component definition

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

/**
 * Prompt for Gemini image generation (fallback when Pexels fails)
 */
export const IMAGE_GENERATION_PROMPT = `Create a professional, modern photograph suitable for a tech and indie hacking blog.

REQUIRED ELEMENTS:
- Clean, modern aesthetic with tech/startup vibes
- Professional quality that feels authentic, not overly staged
- Warm, inviting lighting
- Minimalist design approach

STYLE GUIDANCE:
- Modern workspace or creative environment aesthetic
- Developer/creator focused imagery
- Clean desk setups, code on screens, creative tools
- Diverse representation welcome
- Avoid generic corporate stock photo poses

AVOID:
- Overly busy or cluttered scenes
- Generic business handshakes or meetings
- Text overlays or watermarks
- Low quality or pixelated images
- Outdated technology

TOPIC CONTEXT:
{{TITLE}}

Create an image that a tech-savvy developer or indie hacker would find relevant and professional when reading about this topic.`;
