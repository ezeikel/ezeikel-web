export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: "Dev" | "Product" | "Indie Hacking" | "Creator Life" | "Case Study"
  author: string
  date: string
  readTime: string
  image?: string
  tags: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "chunky-crayon-launch",
    title: "How I Built and Launched Chunky Crayon in 3 Months",
    excerpt:
      "The complete story of building a kids colouring app as a solo developer, from initial idea to getting featured on the App Store.",
    content: `
# How I Built and Launched Chunky Crayon in 3 Months

Building Chunky Crayon was a journey that started with a simple observation: my niece was frustrated with existing colouring apps. The buttons were too small, the colours were overwhelming, and she kept accidentally tapping ads. I knew I could build something better.

## The Problem

Most colouring apps on the market are designed with adult users in mind, then marketed to children as an afterthought. This leads to:

- **Tiny touch targets** that frustrate small fingers
- **Overwhelming colour palettes** that cause decision paralysis
- **Intrusive ads** that interrupt the creative flow
- **Complex features** that confuse young children

## My Solution

I decided to build an app from the ground up with a single focus: **make colouring joyful for kids aged 2-6**.

### Design Principles

1. **Big, chunky controls** - Every button is at least 48pt, with most being 64pt or larger
2. **Curated colour palette** - Just 12 carefully selected colours that work well together
3. **No ads, ever** - A one-time purchase model that respects both kids and parents
4. **Simple gestures** - Tap to select, drag to colour. That's it.

## The Tech Stack

I chose React Native with Expo for rapid cross-platform development:

- **React Native** for cross-platform UI
- **Expo** for managed workflow and easy deployment
- **Skia** for high-performance drawing
- **TypeScript** for type safety

## Key Metrics

After 3 months on the App Store:

- **25,000+ downloads**
- **4.8 star rating** with 500+ reviews
- **Featured in "Apps We Love"**
- **£15,000 revenue** (one-time purchases)

## Lessons Learned

The biggest lesson was the importance of user testing with actual children. What seemed intuitive to me as an adult was often confusing for a 3-year-old. I did dozens of testing sessions with kids before finalising the UI.
    `,
    category: "Case Study",
    author: "Ezeikel Pemberton",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    image: "/blog-chunky-crayon.jpg",
    tags: ["React Native", "Expo", "App Store", "Indie Apps"],
    featured: true,
  },
  {
    id: "2",
    slug: "tech-stack-2026",
    title: "My Tech Stack for Indie Apps in 2026",
    excerpt:
      "Why I chose React Native, Expo, TypeScript, and Postgres for my indie projects, and how this stack has served me well.",
    content: `
# My Tech Stack for Indie Apps in 2026

After building several indie apps over the past few years, I've settled on a tech stack that balances productivity, performance, and maintainability. Here's what I use and why.

## Frontend: React Native + Expo

For mobile apps, React Native with Expo is my go-to choice. The ability to write once and deploy to both iOS and Android is invaluable as a solo developer.

### Why Expo?

- **Managed workflow** handles most native complexity
- **Over-the-air updates** let me fix bugs without App Store review
- **EAS Build** makes CI/CD painless
- **Great developer experience** with fast refresh

## Language: TypeScript

TypeScript is non-negotiable for me now. The type safety catches so many bugs before they reach production.

## Backend: Postgres + Supabase

For most indie projects, Supabase gives me everything I need:

- **Postgres database** with realtime subscriptions
- **Authentication** out of the box
- **Row-level security** for data protection
- **Edge functions** for serverless compute

## Conclusion

This stack lets me move fast while maintaining quality. The key is choosing tools that handle complexity for you, so you can focus on building features that matter.
    `,
    category: "Dev",
    author: "Ezeikel Pemberton",
    date: "Jan 5, 2026",
    readTime: "5 min read",
    image: "/blog-tech-stack.jpg",
    tags: ["Tech Stack", "React Native", "TypeScript", "Postgres"],
    featured: true,
  },
  {
    id: "3",
    slug: "100k-followers",
    title: "Growing to 100K Followers as a Dev Creator",
    excerpt:
      "Lessons learned from building an audience while shipping products as an indie hacker. What worked, what didn't.",
    content: `
# Growing to 100K Followers as a Dev Creator

A year ago, I had 2,000 followers across all platforms. Today, I have over 100,000. Here's what I learned about building an audience as a developer.

## The Strategy

My approach was simple: **build in public and share everything**.

### What Worked

1. **Consistent posting** - I committed to posting daily, even when I didn't feel like it
2. **Behind-the-scenes content** - People love seeing the messy reality of building apps
3. **Educational value** - Every post should teach something or entertain
4. **Cross-platform presence** - Different content for different platforms

### What Didn't Work

- **Trying to go viral** - Chasing trends led to inconsistent content
- **Ignoring comments** - Engagement matters more than follower count
- **Perfectionism** - Done is better than perfect

## The Results

Building an audience has directly impacted my business:

- **App downloads** increase with every viral post
- **Brand deals** provide additional revenue
- **Networking** opened doors I never expected

## Key Takeaway

The best time to start building an audience was yesterday. The second best time is today. Just start creating and improve as you go.
    `,
    category: "Creator Life",
    author: "Ezeikel Pemberton",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    image: "/blog-100k-followers.jpg",
    tags: ["Content Creation", "Social Media", "Indie Hacking"],
  },
  {
    id: "4",
    slug: "parking-ticket-pal-ai",
    title: "Adding AI to Parking Ticket Pal",
    excerpt:
      "How I integrated OpenAI to generate appeal letters and increased the success rate of ticket appeals by 40%.",
    content: `
# Adding AI to Parking Ticket Pal

When I launched Parking Ticket Pal, the appeal letter templates were static. Users would fill in the blanks, but the letters felt generic. I knew AI could make them better.

## The Challenge

Parking ticket appeals need to be:

- **Specific** to the circumstances
- **Professional** in tone
- **Legally sound** in their arguments
- **Persuasive** to the reader

## The Solution

I integrated OpenAI's GPT-4 to generate custom appeal letters based on:

- The type of ticket
- The circumstances of the violation
- Any mitigating factors
- The user's preferred tone

## Results

After implementing AI-generated letters:

- **Appeal success rate** increased from 45% to 67%
- **User satisfaction** scores improved significantly
- **Time to draft** went from 20 minutes to 2 minutes

## Technical Implementation

I used a carefully crafted system prompt that includes UK parking law context and successful appeal templates as examples. This ensures the AI generates legally relevant arguments.
    `,
    category: "Product",
    author: "Ezeikel Pemberton",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    image: "/blog-ai-integration.jpg",
    tags: ["AI", "OpenAI", "Product Development"],
  },
  {
    id: "5",
    slug: "indie-hacking-revenue-2025",
    title: "My Indie Hacking Revenue Breakdown: 2025 Edition",
    excerpt: "Transparent look at how much I made from indie apps, content creation, and brand deals in 2025.",
    content: `
# My Indie Hacking Revenue Breakdown: 2025 Edition

I believe in transparency, so here's exactly how much money I made in 2025 and where it came from.

## Total Revenue: £127,000

### Apps: £85,000 (67%)

- **Chunky Crayon**: £45,000
- **Parking Ticket Pal**: £35,000
- **Other small apps**: £5,000

### Content & Brand Deals: £32,000 (25%)

- **YouTube AdSense**: £12,000
- **Brand sponsorships**: £15,000
- **Affiliate income**: £5,000

### Other: £10,000 (8%)

- **Consulting**: £8,000
- **Course sales**: £2,000

## Key Insights

1. **Apps are the foundation** - Recurring revenue from apps provides stability
2. **Content amplifies apps** - Every viral video drives app downloads
3. **Diversification matters** - Multiple income streams reduce risk

## Plans for 2026

I'm aiming to double this by launching 2 new apps and growing my YouTube channel to 100K subscribers.
    `,
    category: "Indie Hacking",
    author: "Ezeikel Pemberton",
    date: "Dec 15, 2025",
    readTime: "5 min read",
    image: "/blog-revenue-breakdown.jpg",
    tags: ["Revenue", "Indie Hacking", "Transparency"],
  },
]

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return blogPosts
  return blogPosts.filter((post) => post.category === category)
}

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured)
}
