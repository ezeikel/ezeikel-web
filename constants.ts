// Blog Topics for AI Generation
export type BlogTopic = {
  topic: string;
  category: 'indie-hacking' | 'tech' | 'content-creation';
  keywords: string[];
};

export const BLOG_TOPICS: BlogTopic[] = [
  // Indie Hacking & Building
  {
    topic: 'How I launched my first SaaS while working full-time',
    category: 'indie-hacking',
    keywords: ['saas', 'side project', 'launch', 'indie hacker'],
  },
  {
    topic: 'The real cost of building an indie app in 2025',
    category: 'indie-hacking',
    keywords: ['costs', 'budget', 'indie app', 'expenses'],
  },
  {
    topic: 'Why I chose to build in public (and you should too)',
    category: 'indie-hacking',
    keywords: ['build in public', 'transparency', 'community'],
  },
  {
    topic: 'From idea to revenue: My 90-day product launch timeline',
    category: 'indie-hacking',
    keywords: ['product launch', 'timeline', 'revenue', 'mvp'],
  },
  {
    topic: 'The tech stack that helped me ship faster as a solo founder',
    category: 'indie-hacking',
    keywords: ['tech stack', 'solo founder', 'productivity'],
  },
  {
    topic: 'Pricing strategies that actually work for indie products',
    category: 'indie-hacking',
    keywords: ['pricing', 'monetization', 'strategy'],
  },
  {
    topic: 'How I handle customer support as a one-person team',
    category: 'indie-hacking',
    keywords: ['customer support', 'solo', 'automation'],
  },
  {
    topic: 'The tools and workflows that run my indie business',
    category: 'indie-hacking',
    keywords: ['tools', 'workflow', 'automation', 'productivity'],
  },
  {
    topic: 'Lessons learned from my first failed product',
    category: 'indie-hacking',
    keywords: ['failure', 'lessons', 'startup'],
  },
  {
    topic: 'How to validate your product idea before writing code',
    category: 'indie-hacking',
    keywords: ['validation', 'product idea', 'market research'],
  },

  // Tech & Development
  {
    topic: 'Why Next.js App Router changed how I build web apps',
    category: 'tech',
    keywords: ['nextjs', 'app router', 'react', 'web development'],
  },
  {
    topic: 'Building type-safe APIs with tRPC and Next.js',
    category: 'tech',
    keywords: ['trpc', 'typescript', 'api', 'type safety'],
  },
  {
    topic: 'How I structure large React applications in 2025',
    category: 'tech',
    keywords: ['react', 'architecture', 'structure', 'best practices'],
  },
  {
    topic: 'Server Components vs Client Components: A practical guide',
    category: 'tech',
    keywords: ['react', 'server components', 'client components'],
  },
  {
    topic: 'Adding AI features to your app with the Vercel AI SDK',
    category: 'tech',
    keywords: ['ai', 'vercel', 'sdk', 'machine learning'],
  },
  {
    topic: 'Database choices for indie hackers: Postgres vs alternatives',
    category: 'tech',
    keywords: ['database', 'postgres', 'supabase', 'neon'],
  },
  {
    topic: 'Tailwind CSS patterns I use in every project',
    category: 'tech',
    keywords: ['tailwind', 'css', 'patterns', 'styling'],
  },
  {
    topic: 'How to set up a production-ready monorepo with Turborepo',
    category: 'tech',
    keywords: ['monorepo', 'turborepo', 'development'],
  },
  {
    topic: 'Authentication patterns for modern web apps',
    category: 'tech',
    keywords: ['authentication', 'auth', 'security', 'nextauth'],
  },
  {
    topic: 'Performance optimization tips for Next.js applications',
    category: 'tech',
    keywords: ['performance', 'optimization', 'nextjs', 'speed'],
  },
  {
    topic: 'Building a headless CMS with Sanity and Next.js',
    category: 'tech',
    keywords: ['sanity', 'cms', 'headless', 'nextjs'],
  },
  {
    topic: 'State management in 2025: What I actually use',
    category: 'tech',
    keywords: ['state management', 'zustand', 'jotai', 'react'],
  },
  {
    topic: 'How I deploy and monitor my indie apps',
    category: 'tech',
    keywords: ['deployment', 'monitoring', 'vercel', 'observability'],
  },
  {
    topic: 'TypeScript tips that make your code more maintainable',
    category: 'tech',
    keywords: ['typescript', 'tips', 'code quality', 'maintainability'],
  },
  {
    topic: 'Building mobile apps with React Native and Expo',
    category: 'tech',
    keywords: ['react native', 'expo', 'mobile', 'cross-platform'],
  },

  // Content Creation
  {
    topic: 'How I grew my tech audience to 100K followers',
    category: 'content-creation',
    keywords: ['audience', 'growth', 'social media', 'followers'],
  },
  {
    topic: 'The content strategy that works for developer influencers',
    category: 'content-creation',
    keywords: ['content strategy', 'developer', 'influencer'],
  },
  {
    topic: 'Creating short-form content as a developer',
    category: 'content-creation',
    keywords: ['short-form', 'tiktok', 'reels', 'developer'],
  },
  {
    topic: 'How I repurpose content across platforms',
    category: 'content-creation',
    keywords: ['repurposing', 'content', 'platforms', 'efficiency'],
  },
  {
    topic: 'Building a personal brand as a software engineer',
    category: 'content-creation',
    keywords: ['personal brand', 'software engineer', 'career'],
  },
  {
    topic: 'The equipment and setup for my content creation studio',
    category: 'content-creation',
    keywords: ['equipment', 'studio', 'setup', 'gear'],
  },
  {
    topic: 'How I batch create a week of content in one day',
    category: 'content-creation',
    keywords: ['batch create', 'productivity', 'content calendar'],
  },
  {
    topic: 'Monetizing your developer audience: What actually works',
    category: 'content-creation',
    keywords: ['monetization', 'audience', 'income', 'developer'],
  },
  {
    topic: 'Writing technical content that people actually read',
    category: 'content-creation',
    keywords: ['technical writing', 'blog', 'engagement'],
  },
  {
    topic: 'The YouTube strategy for developers who hate being on camera',
    category: 'content-creation',
    keywords: ['youtube', 'developer', 'video', 'camera-shy'],
  },
];

// Blog authors (for auto-generation)
export const BLOG_AUTHORS = [
  {
    name: 'Ezeikel Pemberton',
    slug: 'ezeikel-pemberton',
    bio: 'Senior software engineer, indie hacker, and content creator based in the UK. Building apps, shipping products, and sharing the journey.',
    twitter: '@ezeikel',
  },
];

// Blog categories
export const BLOG_CATEGORIES = [
  {
    title: 'Indie Hacking',
    slug: 'indie-hacking',
    description: 'Building and launching indie products',
    color: 'purple',
  },
  {
    title: 'Tech',
    slug: 'tech',
    description: 'Development tutorials and technical insights',
    color: 'blue',
  },
  {
    title: 'Content Creation',
    slug: 'content-creation',
    description: 'Growing an audience and creating content',
    color: 'green',
  },
];

// Image evaluation threshold
export const IMAGE_EVALUATION_THRESHOLD = 60;
